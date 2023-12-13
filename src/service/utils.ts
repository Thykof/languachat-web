export async function play(data: number[] | undefined) {
  if (data === undefined) {
    return;
  }
  const context = new AudioContext();
  const buffer = await context.decodeAudioData(toArrayBuffer(data));
  const source = context.createBufferSource();
  source.buffer = buffer;
  source.connect(context.destination);
  source.start();
}

function toArrayBuffer(buffer: number[]): ArrayBuffer {
  const arrayBuffer = new ArrayBuffer(buffer.length);
  const view = new Uint8Array(arrayBuffer);
  for (let i = 0; i < buffer.length; ++i) {
    view[i] = buffer[i];
  }
  return arrayBuffer;
}
