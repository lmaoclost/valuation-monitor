import {
  FII_LIST_COLUMN_TYPES,
  FII_PAPEL_COLUMN_TYPES,
  FII_TIJOLO_COLUMN_TYPES,
  STOCK_COLUMN_TYPES,
  USA_REIT_COLUMN_TYPES,
  USA_STOCK_COLUMN_TYPES,
  type ColumnTypes,
} from "./api-filter";

export interface OpenApiParameter {
  name: string;
  in: "query";
  required: false;
  schema: { type: string };
  description: string;
}

export interface OpenApiPathItem {
  get: {
    tags: string[];
    summary: string;
    description: string;
    security: Array<Record<string, string[]>>;
    parameters: OpenApiParameter[];
    responses: Record<string, unknown>;
  };
}

export interface OpenApiSpec {
  openapi: string;
  info: { title: string; version: string; description: string };
  servers: Array<{ url: string; description: string }>;
  components: {
    securitySchemes: Record<string, Record<string, string>>;
  };
  paths: Record<string, OpenApiPathItem>;
}

const NUMERIC_OPS = ["gte", "lte", "gt", "lt", "eq", "ne", "in"] as const;
const STRING_OPS = ["eq", "ne", "contains", "in"] as const;

function paramsForColumns(types: ColumnTypes): OpenApiParameter[] {
  const params: OpenApiParameter[] = [];
  for (const [col, kind] of Object.entries(types)) {
    if (kind === "number") {
      params.push({
        name: col,
        in: "query",
        required: false,
        schema: { type: "string" },
        description: `Filter ${col} (raw fraction, e.g. 0.3, or percent 30%). Bare value means gte.`,
      });
      for (const op of NUMERIC_OPS) {
        params.push({
          name: `${col}.${op}`,
          in: "query",
          required: false,
          schema: { type: "string" },
          description: `Numeric ${op} filter on ${col}. Percent values accept a % suffix (30%).`,
        });
      }
    } else {
      params.push({
        name: col,
        in: "query",
        required: false,
        schema: { type: "string" },
        description: `Exact match on ${col} (case-insensitive).`,
      });
      for (const op of STRING_OPS) {
        params.push({
          name: `${col}.${op}`,
          in: "query",
          required: false,
          schema: { type: "string" },
          description: `String ${op} filter on ${col}. 'in' takes comma-separated values.`,
        });
      }
    }
  }
  params.push({
    name: "sort",
    in: "query",
    required: false,
    schema: { type: "string" },
    description: "Sort by column: sort=<column>:asc|desc.",
  });
  params.push({
    name: "limit",
    in: "query",
    required: false,
    schema: { type: "string" },
    description: "Max rows to return (1-10000).",
  });
  return params;
}

const ERROR_400 = {
  description: "Invalid filter parameter.",
  content: {
    "application/json": {
      schema: {
        type: "object",
        properties: {
          error: { type: "string" },
          allowedColumns: { type: "array", items: { type: "string" } },
        },
      },
    },
  },
};

function pathItem(
  tags: string[],
  summary: string,
  description: string,
  types: ColumnTypes,
  isArray: boolean,
): OpenApiPathItem {
  return {
    get: {
      tags,
      summary,
      description,
      security: [{ appSecret: [] }],
      parameters: paramsForColumns(types),
      responses: {
        "200": {
          description: isArray
            ? "Filtered array of formatted table rows."
            : "Filtered {tijolo, papel} arrays of formatted table rows.",
        },
        "400": ERROR_400,
        "401": { description: "Missing or invalid x-app-secret." },
      },
    },
  };
}

export const OPENAPI_ENDPOINTS: Array<{
  path: string;
  tags: string[];
  summary: string;
  description: string;
  types: ColumnTypes;
  isArray: boolean;
}> = [
  {
    path: "/api/fetch-stocks",
    tags: ["stocks"],
    summary: "List BR stocks with optional column filters",
    description:
      "Full BR stocks table (Bazin/Graham/Gordon discounts included). Filter with <column> or <column>.<op>.",
    types: STOCK_COLUMN_TYPES,
    isArray: true,
  },
  {
    path: "/api/fetch-usa-stocks",
    tags: ["stocks"],
    summary: "List USA stocks with optional column filters",
    description: "Full USA stocks table in USD. Same filter syntax as BR stocks.",
    types: USA_STOCK_COLUMN_TYPES,
    isArray: true,
  },
  {
    path: "/api/fetch-usa-reit",
    tags: ["stocks"],
    summary: "List USA REITs with optional column filters",
    description: "Full USA REIT table in USD. Same filter syntax as stocks.",
    types: USA_REIT_COLUMN_TYPES,
    isArray: true,
  },
  {
    path: "/api/fetch-fii/tijolo",
    tags: ["fii"],
    summary: "List tijolo FIIs with optional column filters",
    description:
      "Tijolo FII table (fairPrice, ceelingPrice, expectativaCrescimento, dy, pvp, ...).",
    types: FII_TIJOLO_COLUMN_TYPES,
    isArray: true,
  },
  {
    path: "/api/fetch-fii/papel",
    tags: ["fii"],
    summary: "List papel FIIs with optional column filters",
    description: "Papel FII table including subcategoria.",
    types: FII_PAPEL_COLUMN_TYPES,
    isArray: true,
  },
  {
    path: "/api/fetch-fii/fiagro",
    tags: ["fii"],
    summary: "List Fiagro FIIs with optional column filters",
    description: "Agronegócio FII list.",
    types: FII_LIST_COLUMN_TYPES,
    isArray: true,
  },
  {
    path: "/api/fetch-fii/fi-infra",
    tags: ["fii"],
    summary: "List FI-Infra FIIs with optional column filters",
    description: "Infrastructure receivables FII list.",
    types: FII_LIST_COLUMN_TYPES,
    isArray: true,
  },
  {
    path: "/api/fetch-fii/fof",
    tags: ["fii"],
    summary: "List FoF FIIs with optional column filters",
    description: "Fundo de fundos FII list.",
    types: FII_LIST_COLUMN_TYPES,
    isArray: true,
  },
  {
    path: "/api/fetch-fii",
    tags: ["fii"],
    summary: "List combined FIIs with optional column filters",
    description:
      "Returns {tijolo, papel}. Filters apply leniently: conditions on columns an array lacks are ignored for that array.",
    types: { ...FII_TIJOLO_COLUMN_TYPES, ...FII_PAPEL_COLUMN_TYPES },
    isArray: false,
  },
];

export function buildOpenApiSpec(): OpenApiSpec {
  const paths: Record<string, OpenApiPathItem> = {};
  for (const e of OPENAPI_ENDPOINTS) {
    paths[e.path] = pathItem(e.tags, e.summary, e.description, e.types, e.isArray);
  }
  return {
    openapi: "3.1.0",
    info: {
      title: "Valuation Monitor API",
      version: "1.0.0",
      description:
        "Filterable valuation tables. All endpoints require the x-app-secret header. Numeric filters accept raw fractions (0.3) or percent values (30%).",
    },
    servers: [{ url: "/", description: "Same origin" }],
    components: {
      securitySchemes: {
        appSecret: {
          type: "apiKey",
          in: "header",
          name: "x-app-secret",
          description: "Private API secret (PRIVATE_API_SECRET).",
        },
      },
    },
    paths,
  };
}
