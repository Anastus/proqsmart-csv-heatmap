import Papa from "papaparse";
import { REQUIRED_HEADERS } from "./constants";

const normalizeHeader = (header = "") =>
  header.replace(/\uFEFF/g, "").trim();

export function parseCsvFile(file) {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const { data, meta } = results;

        if (!data || data.length === 0) {
          reject(new Error("CSV file is empty"));
          return;
        }

        // Prefer actual row keys over meta.fields
        const csvHeaders = Object.keys(data[0]).map(normalizeHeader);

        const missingHeaders = REQUIRED_HEADERS.filter(
          (required) =>
            !csvHeaders.includes(normalizeHeader(required))
        );

        if (missingHeaders.length > 0) {
          reject(
            new Error(
              `Missing required columns: ${missingHeaders.join(", ")}`
            )
          );
          return;
        }

        // Normalize row keys
        const normalizedData = data.map((row) => {
          const normalizedRow = {};
          Object.keys(row).forEach((key) => {
            normalizedRow[normalizeHeader(key)] = row[key];
          });
          return normalizedRow;
        });

        resolve(normalizedData);
      },
      error: (error) => reject(error),
    });
  });
}