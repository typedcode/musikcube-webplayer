const zeroPad = (num: number) => String(num).padStart(2, "0");

export default (seconds: number): string => {
    let absSeconds = Math.floor(seconds);

    let result = "";

    if (absSeconds >= 3600) {
        result += Math.floor(absSeconds / 3600);

        absSeconds %= 3600;
    }

    if (absSeconds >= 60) {
        if (result === "") {
            result += Math.floor(absSeconds / 60);
        } else {
            result += ":" + zeroPad(Math.floor(absSeconds / 60));
        }
        absSeconds %= 60;
    } else if (result !== "") {
        result += ":00";
    }

    if (result === "") {
        result += "0:" + zeroPad(absSeconds);
    } else {
        result += ":" + zeroPad(absSeconds);
    }

    return result;
};
