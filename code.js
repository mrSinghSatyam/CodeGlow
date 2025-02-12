let favcolor = document.querySelector('#favcolor');
let codebox = document.querySelector('#code-box')

favcolor.addEventListener('input', () =>{
    codebox.style.backgroundColor = favcolor.value
})

document.addEventListener("DOMContentLoaded", function() {
    let codeBox = document.querySelector(".code-box pre");
    if (codeBox) {
        codeBox.setAttribute("dir", "ltr"); // Force left-to-right text direction
        codeBox.style.textAlign = "left"; // Align text to left
    }
});

// Function to change theme
document.getElementById("themeSelector").addEventListener("change", function() {
    let theme = this.value;
    let pre = document.getElementById("pre")
    let container = document.getElementById("container");
    let codeOutput = document.getElementById("codeOutput");

    switch(theme) {
        case "nord":
            container.style.color = "#D8DEE9";
            codeOutput.style.color = "#D8DEE9";
            break;
        case "dark":
            container.style.color = "#ffffff";
            codeOutput.style.color = "#ffffff";
            break;
        case "light":
            container.style.color = "#000000";
            codeOutput.style.color = "#1f1eff";
            break;
    }
});

// Function to change code language and update highlighting
document.getElementById("langSelector").addEventListener("change", function() {
    let lang = this.value;
    let codeOutput = document.getElementById("codeOutput");

    // Remove previous language class
    codeOutput.classList.remove("language-cpp", "language-javascript", "language-python");
    
    // Add new language class
    codeOutput.classList.add("language-" + lang);
    
    let codeSamples = {
        "cpp": `using namespace std;
int main() {
    cout << "Hello, World!" << endl;
    return 0;
}`,
        "javascript": `console.log("Hello, World!");`,
        "python": `print("Hello, World!")`
    };

    codeOutput.textContent = codeSamples[lang];

    // Apply syntax highlighting
    Prism.highlightAll();
});

// Function to copy code to clipboard
function copyCode() {
    let codeText = document.getElementById("codeOutput").innerText;
    navigator.clipboard.writeText(codeText).then(() => {
        alert("Code copied to clipboard!");
    });
}

// Live Syntax Highlighting on Input
document.getElementById("codeOutput").addEventListener("input", function() {
    Prism.highlightAll();
});

function exportCodeAsImage() {
    let codeBox = document.getElementById("code-box");

    html2canvas(codeBox).then(canvas => {
        let link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = "code-box.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
}
