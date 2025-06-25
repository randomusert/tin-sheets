// lib/jss.ts
import 'jspreadsheet-ce/dist/jspreadsheet.css'
// @ts-ignore – common workaround for jspreadsheet-esm
import * as jspreadsheetRaw from 'jspreadsheet-ce'

// ✅ Extend the Window type to support worksheets
declare global {
  interface Window {
    worksheets: any[]
  }
}

if (typeof window !== 'undefined' && !window.worksheets) {
  window.worksheets = [] // 👈 this is now valid
}

const jspreadsheet = (jspreadsheetRaw as any).default || jspreadsheetRaw

export default jspreadsheet
