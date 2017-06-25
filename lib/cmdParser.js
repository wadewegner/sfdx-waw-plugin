'use strict';

const _parseArgs = function(cmd, args) { //command *Command, args []string) (result map[string]string, flags map[string]interface{}, err error) {
    let result = {}; //map[string]string{}
    let vargs = parseVarArgs(cmd, args); //args, flags, err = parseVarArgs(command, args)
    if (vargs.err) {
        return { "result":null, "flags":null, "err":vargs.err}; //nil, nil, err
    }
    if (args.length > cmd.args.length) { //len(args) > len(command.Args) {
        //command.unexpectedArgumentsErr(args.slice(cmd.args.length)); //[len(command.Args):])
        throw new Error("unexpected argument - " + args.slice(cmd.args.length));
        //process.exit();
    }
    args.forEach(function(arg, i) { //for i, arg := range args {
        result[cmd.args[i].name] = arg; //result[command.Args[i].Name] = arg
    });
    cmd.args.forEach(function(arg) { //for _, arg := range command.Args {
        if (!arg.optional && result[arg.name] === "") {
            throw new Error("Missing argument: " + arg.name);
            //process.exit(); //ExitWithMessage("Missing argument: %s", strings.ToUpper(arg.Name))
        }
    });
    return { "result":result, "flags":flags, "err":null };
};
// ParseFlag parses a flag from argument inputs
const _parseFlag = function(input, flags) {
    let keyvalue = input.split("=", 2); //:= strings.SplitN(input, "=", 2)
    let key = keyvalue[0];
    let value = "";
    if (keyvalue.length === 2) { //len(keyvalue) == 2 {
        value = keyvalue[1];
    }
    if (key.length > 2 && key[1] != '-') { //len(key) > 2 && key[1] != '-' {
        return _parseFlag(key.slice(2) + "=" + key.slice(0, 3), flags); //(key[:2]+"="+key[2:], flags)
    }

    for (let i=0;i<flags.length;i++) {
        const flag = flags[i];
        if (flag.char != "" && key == "-"+flag.char || key == "--"+flag.name) {
            flag.json = "";
            if (flag.hasValue) {
                if (value == "") {
                    const err = new Error(flag.name + " needs a value");
                    return { "flag":null, "string":"", "error":err }
                }
                return { "flag":flag, "value":value, "error":null };
            }
            if (value != "") {
                const err = new Error(flag.name + " does not take a value");
                return { "flag":null, "value":"", "error":err  };
            }
            return { "flag":flag, "value":"", "error":null };
        }
    };
    return { "flag":null, "value":"", "error":null };
};
const _parseCommand = function(cmd, args) {
    let result = []; //make([]string, 0, len(args))
    let flags = {}; //map[string]interface{}{}
    let parseFlags = true;
    let possibleFlags = [];

    if (cmd.flags && cmd.flags.length > 0) {
        cmd.flags.forEach(function(f)
        { // := range command.Flags {
            //f := flag
            possibleFlags.push(f); // = append(possibleFlags, &f)
        });
    }

    for (let i = 0; i < args.length; i++) {
        switch (true) {
        case parseFlags && (args[i] == "--"):
            parseFlags = false
        case parseFlags && (args[i] == "--help" || args[i] == "-h"):
            return; //nil, nil, errHelp
        case parseFlags && (args[i] == "--no-color"):
            break;
        case parseFlags && args[i][0] === "-": //strings.HasPrefix(args[i], "-"):
            let val;
            let flag = _parseFlag(args[i], possibleFlags);  //need to return an object with val and err
            if (flag.error && flag.error.message.endsWith("needs a value")) {
                i++
                if (args.length === i) {
                    throw new Error(err);
                    //process.exit(); //ExitWithMessage(err.Error())
                }
                flag = _parseFlag(args[i-1]+"="+args[i], possibleFlags);
            }
            if (flag.flag) {
                if (flag.flag.hasValue) {
                    flags[flag.flag.name] = flag.value
                } else {
                    flags[flag.flag.name] = true
                }
            }
            switch (true) {
            case flag.error != null:
                throw new Error(flag.error);
                //process.exit(); //ExitWithMessage(err.Error())
            case !flag.flag && cmd.variableArgs:
                result.push(args[i]); // = append(result, args[i])
            case !flag.flag == null: // == nil:
                throw new Error(args[i]);
                //process.exit(); //command.unexpectedFlagErr(args[i])
            }
        default:
            result.push(args[i]); // = append(result, args[i])
        }
    }
    cmd.flags.forEach(function(flag) 
    { //for _, flag := range command.Flags {
        if (flag.Required && flags[flag.Name]) { //flags[flag.Name] == nil {
            throw new Error("Required flag: " + flag.name);
            //process.exit(); //ExitWithMessage("Required flag: %s", flag.String())
        }
    });
    return { "result":result, "flags":flags }; //, nil
}
module.exports = {
    parseCommand: (root, args) => {
        const cmds = root.commands
        let cmd;
        const options = JSON.parse(process.argv[2].trim());

        const cmdstring = options.cmd.trim().split(' ');
        const cstring = cmdstring.shift();

        const cmdSplit = cstring.trim().split(':');
        const flagstr = cmdstring.join(' ');

        const flags = flagstr.split(" ");
        const namespace = cmdSplit.shift().trim();
        const topic = cmdSplit.shift().trim();

        // Make sure the command entered via script is a valid command for this plugin
        for (let i=0, len=cmds.length; i<len; i++) {
            if (cmds[i].topic === topic && cmds[i].command === cmdSplit.join(':')) {
                cmd = cmds[i];
                break;
            }
        }

        if (!cmd) {
            console.error(`Command ${options.cmd} not found`);
            throw new Error(`Command ${options.cmd} not found`);
        }

        const parsedCommand = _parseCommand(cmd, flags);
        return { cmd:cmd, flags:parsedCommand.flags };
    }
}


