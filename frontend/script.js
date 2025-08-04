import { Actor, HttpAgent } from 'https://cdn.jsdelivr.net/npm/@dfinity/agent/+esm';
import { idlFactory } from "/.dfx/local/canisters/cycle_minting_canister/service.did.js";

const canisterId = "rkp4c-7iaaa-aaaaa-aaaca-cai";

const agent = new HttpAgent({ host: "http://localhost:8080" });
// Only for local development; remove for production
agent.fetchRootKey();

const cmc = Actor.createActor(idlFactory, {
  agent,
  canisterId,
});

// --- TODO List (Hinglish) ---



// 2. HTML File Banayein:
//    - Ek `index.html` file banayein aur usmein `script.js` ko include karein.
//      `<script type="module" src="script.js"></script>`

// 3. Local Server Chalaayein:
//    - HTML file ko browser mein kholne ke liye ek local server ka use karein.
//    - Agar aapke paas Node.js hai, to aap `npx serve` chala sakte hain.

// 4. UI Mein Functions Dikhana:
//    - Har ek canister function ke liye HTML mein ek section banayein.
//    - Har section mein input fields (jahan zaroori ho) aur ek button hoga.

// 5. Canister Functions ko Call Karna:
//    - Har button ke click par, corresponding canister function ko call karein.
//    - Input values ko UI se lein aur function arguments mein pass karein.

// 6. Results ko Display Karna:
//    - Canister se mile response ko handle karein.
//    - Success (Ok) ya error (Err) ke basis pe UI update karein.

// 7. Update Calls ke liye Identity:
//    - `update` calls (jaise `create_canister`) ke liye user ko Identity se login karwana padega.
//    - Aap `@dfinity/auth-client` ka use karke Internet Identity integrate kar sakte hain.

// Example: get_build_metadata function ko call karna
document.addEventListener("DOMContentLoaded", () => {
    const functionsContainer = document.getElementById("functions");

    // --- get_build_metadata ---
    const getBuildMetadataDiv = document.createElement("div");
    getBuildMetadataDiv.classList.add("function");
    getBuildMetadataDiv.innerHTML = `
        <h3>get_build_metadata</h3>
        <button id="getBuildMetadataBtn">Call</button>
        <pre id="getBuildMetadataResult"></pre>
    `;
    functionsContainer.appendChild(getBuildMetadataDiv);

    document.getElementById("getBuildMetadataBtn").addEventListener("click", async () => {
        const resultContainer = document.getElementById("getBuildMetadataResult");
        resultContainer.textContent = "Calling...";
        try {
            const result = await cmc.get_build_metadata();
            resultContainer.textContent = JSON.stringify(result, null, 2);
        } catch (error) {
            console.error(error);
            resultContainer.textContent = "Error: " + error.message;
        }
    });

    // TODO: Baaki sabhi functions ke liye aise hi sections add karein.
});