$(document).ready(function() {
    $("#runBtn").click(function() {
        runcode();
    });
    $("#resetBtn").click(function() {
        reset();
    });
});

// creating the bot 
Blockly.Blocks['bot'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("bot");
        this.appendStatementInput("bot")
            .setCheck(null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

// creating questions block
Blockly.Blocks['ask_me_anything'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Ask me a question")
            .appendField(new Blockly.FieldDropdown([
                ["What is the date today?", "ques-1"],
                ["What is the time now?", "ques-2"],
                ["How are you?", "ques-3"],
                ["What is JavaScript?", "ques-4"],
                ["What is your name?", "ques-5"]
            ]), "askMeAnything");
        this.setPreviousStatement(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

// askMeAnything Javascript Block 
Blockly.JavaScript['ask_me_anything'] = function(block) {
    return block.getFieldValue('askMeAnything');
};

// JS code for bot block
Blockly.JavaScript['bot'] = function(block) {
    var selectedQuestion = Blockly.JavaScript.statementToCode(block, 'bot').trim();
    var code = `
      var inputTextValue = "${selectedQuestion}";
  `;
    return code;
};

var workspace = Blockly.inject("blocklyDiv", {
    media: "assets/media/",
    toolbox: document.getElementById("toolbox"),
});

function redrawUi() {
    let answer = '';
    if (inputTextValue !== "undefined") {
        if (inputTextValue === "ques-1") {
            answer = moment().format("MMM Do YY");
        } else if (inputTextValue === "ques-2") {
            answer = moment().format('LTS');
        } else if (inputTextValue === "ques-3") {
            answer = "I am Fine, thanks";
        } else if (inputTextValue === "ques-4") {
            answer = "JavaScript is an object-oriented computer programming language commonly used to create interactive effects within web browsers.";
        } else if (inputTextValue === "ques-5") {
            answer = "My name is Ayushi Jain";
        }
        $("#inputBox").text(answer);
    } else {
        $("#inputBox").text("");
    }
}

// runnning block
function runcode() {
    // Generate JavaScript code and run it.
    var geval = eval;
    try {
        geval(Blockly.JavaScript.workspaceToCode(workspace));
    } catch (e) {
        console.error(e);
    }
    redrawUi();
}

// reset block
function reset() {
    delete inputTextValue;
    location.reload();
    redrawUi();
}