const fs = require('fs');
const { createReadStream } = require('fs');
const readline = require('readline');
const path = require('path');

async function extractLogs(logFile, targetDate) {
    const outputDir = path.join(__dirname, '..', 'output'); // Output directory: tech/output
    const outputFile = path.join(outputDir, `output_${targetDate}.txt`);
    
    // Ensure output directory exists
    if (!fs.existsSync(outputDir)) {
        console.error(`❌ Output directory not found: ${outputDir}`);
        process.exit(1);
    }

    const writeStream = fs.createWriteStream(outputFile, { encoding: 'utf8' });
    const readStream = createReadStream(logFile, { encoding: 'utf8' });
    const rl = readline.createInterface({ input: readStream, crlfDelay: Infinity });

    let lineCount = 0;
    for await (const line of rl) {
        if (line.startsWith(targetDate)) {
            writeStream.write(line + '\n');
            lineCount++;
        }
    }

    writeStream.end();
    console.log(`✅ Logs extracted to ${outputFile} (${lineCount} lines matching ${targetDate})`);
}

async function main() {
    const args = process.argv.slice(2);
    if (args.length !== 1) {
        console.log('Usage: node extract_logs.js YYYY-MM-DD');
        process.exit(1);
    }

    const targetDate = args[0];
    if (!/^\d{4}-\d{2}-\d{2}$/.test(targetDate)) {
        console.log('❌ Invalid date format. Use YYYY-MM-DD.');
        process.exit(1);
    }

    const logFilePath = path.join(__dirname, 'logs_extracted', 'logs_2024.log'); // Correct log file path

    if (!fs.existsSync(logFilePath)) {
        console.log(`❌ Log file not found: ${logFilePath}`);
        process.exit(1);
    }

    try {
        console.log(`🔍 Searching logs for date: ${targetDate}`);
        await extractLogs(logFilePath, targetDate);
    } catch (err) {
        console.error('❌ Error:', err);
    }
}

main();
