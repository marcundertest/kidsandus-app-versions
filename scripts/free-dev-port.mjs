import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);
const port = process.argv[2] ?? '3000';
const sleep = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

async function getListeningPids() {
  try {
    const { stdout } = await execFileAsync('lsof', [`-tiTCP:${port}`, '-sTCP:LISTEN']);
    return [...new Set(stdout.split(/\s+/).filter(Boolean).map(Number))];
  } catch (error) {
    if (error.code === 1) return [];
    throw error;
  }
}

async function getNextParent(pid) {
  try {
    const { stdout } = await execFileAsync('ps', ['-o', 'ppid=,command=', '-p', String(pid)]);
    const match = stdout.trim().match(/^(\d+)\s+(.+)$/s);
    if (!match || !match[2].includes('next')) return null;
    return Number(match[1]);
  } catch (error) {
    if (error.code === 1) return null;
    throw error;
  }
}

async function getNextProcesses() {
  const pids = new Set(await getListeningPids());

  for (const listenerPid of pids) {
    let pid = listenerPid;
    while (pid) {
      const parentPid = await getNextParent(pid);
      if (!parentPid || pids.has(parentPid)) break;
      pids.add(parentPid);
      pid = parentPid;
    }
  }

  return [...pids];
}

function terminate(pid, signal) {
  try {
    process.kill(pid, signal);
  } catch (error) {
    if (error.code !== 'ESRCH') throw error;
  }
}

function isRunning(pid) {
  try {
    process.kill(pid, 0);
    return true;
  } catch (error) {
    return error.code !== 'ESRCH';
  }
}

async function waitForExit(pids, timeout) {
  const deadline = Date.now() + timeout;
  while (Date.now() < deadline) {
    if (pids.every((pid) => !isRunning(pid))) return true;
    await sleep(100);
  }
  return false;
}

const pids = await getNextProcesses();
for (const pid of pids) terminate(pid, 'SIGTERM');

if (!(await waitForExit(pids, 5000))) {
  for (const pid of pids) terminate(pid, 'SIGKILL');
  await waitForExit(pids, 1000);
}
