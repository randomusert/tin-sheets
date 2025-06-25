'use client'

import { useEffect, useRef, useState } from 'react'
import 'jspreadsheet-ce/dist/jspreadsheet.css'

export default function Edit() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // 1. Patch the global 'worksheets' BEFORE importing jspreadsheet
    if (typeof window !== 'undefined' && !(window as any).worksheets) {
      (window as any).worksheets = []
    }

    // 2. Dynamically import jspreadsheet after patch
    import('jspreadsheet-ce')
      .then((module) => {
        const jspreadsheet = (module as any).default || module

        // 3. Clear previous mount if needed
        if (containerRef.current) {
          containerRef.current.innerHTML = ''

          const instance = jspreadsheet(containerRef.current, {
            data: [['Name', 'Age'], ['Alice', 30], ['Bob', 25]],
            columns: [
              { type: 'text', title: 'Name', width: 150 },
              { type: 'number', title: 'Age', width: 100 },
            ],
          } as any)

          return () => {
            instance?.destroy?.()
          }
        }
      })
      .catch((err) => {
        console.error('JSS load error', err)
        setError('Failed to load spreadsheet.')
      })
  }, [])

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Tin Sheets</h2>
      {error && <p className="text-red-500">{error}</p>}
      <div ref={containerRef} />
    </div>
  )
}
