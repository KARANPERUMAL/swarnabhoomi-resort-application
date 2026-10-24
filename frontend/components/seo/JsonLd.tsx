import React from "react";

interface JsonLdProps {
  data: Record<string, unknown> | Array<Record<string, unknown>>;
}

/**
 * XSS-safe component to inject Schema.org JSON-LD structured data into the document head/body.
 * Escapes closing HTML tag characters to prevent script-injection attacks.
 */
export function JsonLd({ data }: JsonLdProps) {
  const serialized = JSON.stringify(data).replace(/</g, "\\u003c");

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serialized }}
    />
  );
}
