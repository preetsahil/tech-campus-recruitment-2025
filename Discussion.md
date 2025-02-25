Discussion on Log Extraction Script

Solutions Considered

Using unzipper to Extract Logs from ZIP

Initially, we attempted to use the unzipper package to extract the logs_2024.log.zip file.

This approach failed due to an "invalid signature" error, likely due to compatibility issues or file corruption.

Using Native unzip Command

We switched to using the native unzip command to extract logs_2024.log manually.

This ensured the log file was extracted correctly before processing.

File Processing with Streamed Read Approach

Instead of reading the entire file into memory, we opted for a streamed approach using readline to handle large log files efficiently.

This prevents memory overload and allows for faster processing.

Final Solution Summary

We chose the final solution based on reliability and efficiency:

Extracting logs manually using unzip ensures we avoid issues with third-party ZIP handling libraries.

Using readline to process logs line-by-line minimizes memory usage and improves performance when handling large log files.

Validating file existence and format upfront prevents runtime errors and ensures smooth execution.

Steps to Run
Extract Log File

Run the following command to extract logs manually before running the script:
inside the src run the below command
unzip logs_2024.log.zip -d logs_extracted

Run the Script

Navigate to the src/ directory:



Execute the script with a date parameter (format: YYYY-MM-DD):

node extract_logs.js 2024-12-01

This will generate an output file in tech/output/, e.g., output_2024-12-01.txt.

Verify Output

The extracted logs should appear in the output/ directory.

Example output file: tech/output/output_2024-12-01.txt.

This approach ensures an efficient and reliable way to extract log data while maintaining flexibility in handling future log files.

