const ALGO = "AES-GCM";

// bytes -> url-safe text (safe to put in a link)
function toBase64Url(bytes: Uint8Array): string {
  let binary = "";
  for (const b of bytes) binary += String.fromCharCode(b);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

// url-safe text -> bytes
function fromBase64Url(text: string): Uint8Array<ArrayBuffer> {
  const base64 = text.replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64 + "=".repeat((4 - (base64.length % 4)) % 4);
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

export async function encryptNote(plaintext: string) {
  // 1. new random 256-bit key for every note
  const key = await crypto.subtle.generateKey({ name: ALGO, length: 256 }, true, ["encrypt", "decrypt"]);

  // 2. new random iv (12 bytes) for every note. Never reuse it with the same key.
  const iv = crypto.getRandomValues(new Uint8Array(12));

  // 3. encrypt
  const data = new TextEncoder().encode(plaintext);
  const encrypted = await crypto.subtle.encrypt({ name: ALGO, iv }, key, data);

  // 4. export the key so it can go in the link
  const rawKey = new Uint8Array(await crypto.subtle.exportKey("raw", key));

  return {
    ciphertext: toBase64Url(new Uint8Array(encrypted)), // goes to the server
    iv: toBase64Url(iv), // goes to the server
    key: toBase64Url(rawKey), // goes ONLY in the link after #
  };
}

export async function decryptNote(ciphertext: string, iv: string, keyText: string): Promise<string> {
  const key = await crypto.subtle.importKey("raw", fromBase64Url(keyText), { name: ALGO }, false, ["decrypt"]);
  const decrypted = await crypto.subtle.decrypt({ name: ALGO, iv: fromBase64Url(iv) }, key, fromBase64Url(ciphertext));
  return new TextDecoder().decode(decrypted);
}