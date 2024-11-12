export default (millisecondsToWait: number) => new Promise(res => setTimeout(res, millisecondsToWait));
