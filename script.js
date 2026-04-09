// ------------------ DETECT CONFLICT ------------------

function detectConflict() {
    let codeA = document.getElementById("codeA").value.split("\n");
    let codeB = document.getElementById("codeB").value.split("\n");

    let maxLength = Math.max(codeA.length, codeB.length);
    let conflictLines = [];

    for (let i = 0; i < maxLength; i++) {
        let lineA = codeA[i] || "";
        let lineB = codeB[i] || "";

        if (lineA.trim() !== lineB.trim()) {
            conflictLines.push(i + 1);
        }
    }

    if (conflictLines.length > 0) {
        document.getElementById("result").innerText =
            "⚠️ Conflict Detected at lines: " + conflictLines.join(", ");
    } else {
        document.getElementById("result").innerText =
            "✅ No Conflict!";
    }
}


// ------------------ RESOLVE CONFLICT ------------------

function resolveConflict(type) {
    let codeA = document.getElementById("codeA").value.split("\n");
    let codeB = document.getElementById("codeB").value.split("\n");

    let result = [];

    let maxLength = Math.max(codeA.length, codeB.length);
    let conflict = false;

    // 🔍 Check conflict again (for message)
    for (let i = 0; i < maxLength; i++) {
        if ((codeA[i] || "").trim() !== (codeB[i] || "").trim()) {
            conflict = true;
            break;
        }
    }

    let outputMessage = conflict
        ? "⚠️ Conflict Detected & Resolved\n\n"
        : "✅ No Conflict\n\n";

    // ------------------ OPTIONS ------------------

    if (type === "A") {
        result = codeA;
    } 
    else if (type === "B") {
        result = codeB;
    } 
    else {
        // 🤖 AI AUTO RESOLUTION
        for (let i = 0; i < maxLength; i++) {

            let lineA = codeA[i] || "";
            let lineB = codeB[i] || "";

            if (lineA.trim() === lineB.trim()) {
                // Same → keep one
                result.push(lineA);
            } else {
                // 🔥 AI RULES

                // Rule 1: Prefer non-empty latest change (B)
                if (lineB.trim() !== "") {
                    result.push(lineB);
                } 
                else {
                    result.push(lineA);
                }
            }
        }
    }

    // ------------------ FINAL OUTPUT ------------------

    document.getElementById("result").innerText =
        outputMessage + result.join("\n");
}
