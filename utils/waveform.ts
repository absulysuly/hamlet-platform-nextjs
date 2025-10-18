// Fix: Populating utils/waveform.ts with audio processing and canvas drawing logic.

/**
 * Normalizes the audio data to a range of 0 to 1.
 */
const normalizeData = (filteredData: number[]) => {
    const max = Math.max(...filteredData);
    if (max === 0) return filteredData; // Avoid division by zero
    const multiplier = 1 / max;
    return filteredData.map(n => n * multiplier);
};

/**
 * Filters the audio data to a specific number of samples.
 */
const filterData = (audioBuffer: AudioBuffer, samples: number) => {
    const rawData = audioBuffer.getChannelData(0); // Use one channel
    const blockSize = Math.floor(rawData.length / samples);
    const filteredData: number[] = [];
    for (let i = 0; i < samples; i++) {
        const blockStart = blockSize * i;
        let sum = 0;
        for (let j = 0; j < blockSize; j++) {
            sum = sum + Math.abs(rawData[blockStart + j]);
        }
        filteredData.push(sum / blockSize); // Average amplitude
    }
    return filteredData;
};

const drawLine = (
    ctx: CanvasRenderingContext2D,
    x: number,
    height: number,
    width: number,
    color: string
) => {
    ctx.strokeStyle = color;
    ctx.lineWidth = width / 2;
    ctx.beginPath();
    ctx.moveTo(x + width / 2, -height / 2);
    ctx.lineTo(x + width / 2, height / 2);
    ctx.stroke();
};


/**
 * Draws the waveform on the canvas.
 */
export const drawWaveform = (
    canvas: HTMLCanvasElement,
    normalizedData: number[],
    color: string
) => {
    const dpr = window.devicePixelRatio || 1;
    const padding = 5;
    canvas.width = canvas.offsetWidth * dpr;
    canvas.height = (canvas.offsetHeight + padding * 2) * dpr;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.scale(dpr, dpr);
    ctx.translate(0, canvas.offsetHeight / 2 + padding);
    ctx.clearRect(0, -canvas.height, canvas.width, canvas.height * 2);

    const width = canvas.offsetWidth / normalizedData.length;
    for (let i = 0; i < normalizedData.length; i++) {
        const x = width * i;
        let height = normalizedData[i] * (canvas.offsetHeight - padding);
        if (height < 0) height = 0;
        
        drawLine(ctx, x, height, width, color);
    }
};

// Singleton AudioContext to avoid creating multiple contexts
let audioContext: AudioContext | null = null;
const getAudioContext = () => {
    if (!audioContext) {
        audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return audioContext;
};

/**
 * Fetches and processes an audio file into waveform data.
 * @returns An array of numbers for visualization, or null if it fails.
 */
export const getWaveformData = async (
    audioUrl: string
): Promise<number[] | null> => {
    try {
        const context = getAudioContext();
        // Fetch audio data
        const response = await fetch(audioUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const arrayBuffer = await response.arrayBuffer();
        const audioBuffer = await context.decodeAudioData(arrayBuffer);

        const samples = 100; // Number of bars to generate
        const filteredData = filterData(audioBuffer, samples);
        const normalizedData = normalizeData(filteredData);
        
        return normalizedData;

    } catch (e) {
        console.warn(
            "Could not generate real waveform due to a network error (likely CORS). Displaying a fallback visualization. Full error:",
            e
        );
        // Return null to indicate failure, allowing the UI to show a fallback.
        return null;
    }
};