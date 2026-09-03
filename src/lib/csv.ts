/**
 * Minimal RFC 4180 CSV parser.
 *
 * Written by hand rather than pulled from npm because it is ~40 lines and this
 * is the one place the whole events system can silently corrupt itself. A naive
 * `line.split(',')` breaks the moment someone types "Free, no ticket required"
 * into the admission column.
 *
 * Handles: quoted fields, commas inside quotes, newlines inside quotes,
 * escaped double-quotes (""), CRLF line endings, and a leading UTF-8 BOM.
 */

/** Parse CSV text into an array of rows, each row an array of raw cell strings. */
export function parseCsv(input: string): string[][] {
  // A UTF-8 BOM would become part of the first header name and quietly break
  // every lookup of that column.
  const text = input.charCodeAt(0) === 0xfeff ? input.slice(1) : input;

  const rows: string[][] = [];
  let row: string[] = [];
  let field = '';
  let inQuotes = false;
  let i = 0;

  while (i < text.length) {
    const char = text[i];

    if (inQuotes) {
      if (char === '"') {
        if (text[i + 1] === '"') {
          field += '"'; // "" is an escaped quote
          i += 2;
          continue;
        }
        inQuotes = false;
        i++;
        continue;
      }
      field += char;
      i++;
      continue;
    }

    if (char === '"') {
      inQuotes = true;
      i++;
    } else if (char === ',') {
      row.push(field);
      field = '';
      i++;
    } else if (char === '\n') {
      row.push(field);
      rows.push(row);
      row = [];
      field = '';
      i++;
    } else if (char === '\r') {
      i++; // part of CRLF; the \n does the work
    } else {
      field += char;
      i++;
    }
  }

  // Whatever is left after the last newline.
  if (field !== '' || row.length > 0) {
    row.push(field);
    rows.push(row);
  }

  return rows;
}

/**
 * Parse CSV into objects keyed by the header row, values trimmed.
 *
 * Columns are matched by header NAME, never by position, so the Sheet's columns
 * can be reordered or added to without touching this code. Renaming a header
 * WILL break it — that constraint is documented in the vault note.
 */
export function parseCsvToObjects(input: string): Record<string, string>[] {
  const rows = parseCsv(input);
  if (rows.length === 0) return [];

  const headers = rows[0].map((h) => h.trim());

  return rows.slice(1).map((row) => {
    const obj: Record<string, string> = {};
    headers.forEach((header, index) => {
      obj[header] = (row[index] ?? '').trim();
    });
    return obj;
  });
}
