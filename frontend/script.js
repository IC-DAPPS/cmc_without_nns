import { Actor, HttpAgent } from 'https://cdn.jsdelivr.net/npm/@dfinity/agent/+esm';
import { idlFactory } from "./service.did.js";

const canisterId = "rkp4c-7iaaa-aaaaa-aaaca-cai";

const agent = new HttpAgent({ host: "http://localhost:8080" });
// Only for local development; remove for production
agent.fetchRootKey();

const cmc = Actor.createActor(idlFactory, {
    agent,
    canisterId,
});

// Example: get_build_metadata function ko call karna
document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM loaded, setting up functions...");
    const functionsContainer = document.getElementById("functions");
    console.log("Functions container:", functionsContainer);

    // --- get_build_metadata ---
    const getBuildMetadataDiv = document.createElement("div");
    getBuildMetadataDiv.classList.add("function");
    getBuildMetadataDiv.innerHTML = `
        <h3>get_build_metadata</h3>
        <button id="getBuildMetadataBtn">Call</button>
        <pre id="getBuildMetadataResult"></pre>
    `;
    functionsContainer.appendChild(getBuildMetadataDiv);
    console.log("Added get_build_metadata function");

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

    // --- get_default_subnets ---
    const getDefaultSubnetsDiv = document.createElement("div");
    getDefaultSubnetsDiv.classList.add("function");
    getDefaultSubnetsDiv.innerHTML = `
        <h3>get_default_subnets</h3>
        <button id="getDefaultSubnetsBtn">Call</button>
        <pre id="getDefaultSubnetsResult"></pre>
    `;
    functionsContainer.appendChild(getDefaultSubnetsDiv);

    document.getElementById("getDefaultSubnetsBtn").addEventListener("click", async () => {
        const resultContainer = document.getElementById("getDefaultSubnetsResult");
        resultContainer.textContent = "Calling...";
        try {
            const result = await cmc.get_default_subnets();
            resultContainer.textContent = JSON.stringify(result, null, 2);
        } catch (error) {
            console.error(error);
            resultContainer.textContent = "Error: " + error.message;
        }
    });

    // --- get_icp_xdr_conversion_rate ---
    const getIcpXdrConversionRateDiv = document.createElement("div");
    getIcpXdrConversionRateDiv.classList.add("function");
    getIcpXdrConversionRateDiv.innerHTML = `
        <h3>get_icp_xdr_conversion_rate</h3>
        <button id="getIcpXdrConversionRateBtn">Call</button>
        <pre id="getIcpXdrConversionRateResult"></pre>
    `;
    functionsContainer.appendChild(getIcpXdrConversionRateDiv);

    document.getElementById("getIcpXdrConversionRateBtn").addEventListener("click", async () => {
        const resultContainer = document.getElementById("getIcpXdrConversionRateResult");
        resultContainer.textContent = "Calling...";
        try {
            const result = await cmc.get_icp_xdr_conversion_rate();
            // Handle BigInt serialization
            const serializedResult = JSON.stringify(result, (key, value) =>
                typeof value === 'bigint' ? value.toString() : value
            , 2);
            resultContainer.textContent = serializedResult;
        } catch (error) {
            console.error(error);
            resultContainer.textContent = "Error: " + error.message;
        }
    });

    // --- get_principals_authorized_to_create_canisters_to_subnets ---
    const getPrincipalsAuthorizedDiv = document.createElement("div");
    getPrincipalsAuthorizedDiv.classList.add("function");
    getPrincipalsAuthorizedDiv.innerHTML = `
        <h3>get_principals_authorized_to_create_canisters_to_subnets</h3>
        <button id="getPrincipalsAuthorizedBtn">Call</button>
        <pre id="getPrincipalsAuthorizedResult"></pre>
    `;
    functionsContainer.appendChild(getPrincipalsAuthorizedDiv);

    document.getElementById("getPrincipalsAuthorizedBtn").addEventListener("click", async () => {
        const resultContainer = document.getElementById("getPrincipalsAuthorizedResult");
        resultContainer.textContent = "Calling...";
        try {
            const result = await cmc.get_principals_authorized_to_create_canisters_to_subnets();
            resultContainer.textContent = JSON.stringify(result, null, 2);
        } catch (error) {
            console.error(error);
            resultContainer.textContent = "Error: " + error.message;
        }
    });

    // --- get_subnet_types_to_subnets ---
    const getSubnetTypesDiv = document.createElement("div");
    getSubnetTypesDiv.classList.add("function");
    getSubnetTypesDiv.innerHTML = `
        <h3>get_subnet_types_to_subnets</h3>
        <button id="getSubnetTypesBtn">Call</button>
        <pre id="getSubnetTypesResult"></pre>
    `;
    functionsContainer.appendChild(getSubnetTypesDiv);

    document.getElementById("getSubnetTypesBtn").addEventListener("click", async () => {
        const resultContainer = document.getElementById("getSubnetTypesResult");
        resultContainer.textContent = "Calling...";
        try {
            const result = await cmc.get_subnet_types_to_subnets();
            resultContainer.textContent = JSON.stringify(result, null, 2);
        } catch (error) {
            console.error(error);
            resultContainer.textContent = "Error: " + error.message;
        }
    });
});