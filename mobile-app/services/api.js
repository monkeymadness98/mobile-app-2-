// Update BACKEND_URL if your backend runs elsewhere
export const BACKEND_URL = 'http://10.0.2.2:8000'; // emulator default for android emulator
// For real device using local machine, use your PC LAN IP, e.g. http://192.168.1.10:8000

import axios from 'axios';

export async function postEntry(entry) {
  try {
    const res = await axios.post(`${BACKEND_URL}/entries/`, entry);
    return res.data;
  } catch (e) {
    console.warn('API save error', e.message);
    throw e;
  }
}

export async function fetchEntries() {
  try {
    const res = await axios.get(`${BACKEND_URL}/entries/`);
    return res.data;
  } catch (e) {
    console.warn('API fetch error', e.message);
    return [];
  }
}
