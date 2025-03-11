export class OceanSoundGenerator {
    private audioCtx: AudioContext | null = null;
    private source: AudioBufferSourceNode | null = null;
    private filter: BiquadFilterNode | null = null;
    private gainNode: GainNode | null = null;
    private lfo: OscillatorNode | null = null;

    async start() {
        if (!this.audioCtx) {
            this.audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();

            // Create white noise buffer
            const bufferSize = 2 * this.audioCtx.sampleRate;
            const noiseBuffer = this.audioCtx.createBuffer(1, bufferSize, this.audioCtx.sampleRate);
            const output = noiseBuffer.getChannelData(0);
            for (let i = 0; i < bufferSize; i++) {
                output[i] = Math.random() * 2 - 1;
            }

            // Noise source
            this.source = this.audioCtx.createBufferSource();
            this.source.buffer = noiseBuffer;
            this.source.loop = true;

            // Low-pass filter for ocean wave simulation
            this.filter = this.audioCtx.createBiquadFilter();
            this.filter.type = "lowpass";
            this.filter.frequency.setValueAtTime(500, this.audioCtx.currentTime);

            // LFO for wave motion
            this.lfo = this.audioCtx.createOscillator();
            this.lfo.frequency.setValueAtTime(0.2, this.audioCtx.currentTime);
            this.lfo.start();

            // Gain node for volume control
            this.gainNode = this.audioCtx.createGain();
            this.gainNode.gain.setValueAtTime(0.3, this.audioCtx.currentTime);

            // LFO modulation
            const lfoGain = this.audioCtx.createGain();
            lfoGain.gain.value = 0.3;
            this.lfo.connect(lfoGain);
            lfoGain.connect(this.gainNode.gain);

            // Connect audio nodes
            this.source.connect(this.filter);
            this.filter.connect(this.gainNode);
            this.gainNode.connect(this.audioCtx.destination);

            this.source.start();
        }
    }

    stop() {
        if (this.audioCtx) {
            this.source?.stop();
            this.audioCtx.close();
            this.audioCtx = null;
            this.source = null;
            this.filter = null;
            this.gainNode = null;
            this.lfo = null;
        }
    }

    // Method to adjust wave intensity based on simulation
    setWaveIntensity(intensity: number) {
        if (this.gainNode) {
            // Scale intensity to appropriate gain range (0.1 to 0.5)
            const gain = Math.min(Math.max(intensity * 0.5, 0.1), 0.5);
            this.gainNode.gain.setValueAtTime(gain, this.audioCtx?.currentTime || 0);
        }
    }
}
