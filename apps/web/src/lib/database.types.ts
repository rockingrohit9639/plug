export type Database = {
  public: {
    Tables: {
      servers: {
        Row: {
          id: string;
          slug: string;
          name: string;
          description: string | null;
          ai_summary: string | null;
          source_url: string;
          npm_package: string | null;
          author: string | null;
          license: string | null;
          transport: "stdio" | "http" | "sse" | null;
          trust_score: number | null;
          grade: "A" | "B" | "C" | "D" | "F" | null;
          github_stars: number;
          last_commit: string | null;
          open_issues: number;
          has_tests: boolean;
          has_typescript: boolean;
          dependency_count: number;
          categories: string[];
          scanned_at: string | null;
          scanned_version: string | null;
          status: "pending" | "scanning" | "complete" | "error";
          created_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          name: string;
          description?: string | null;
          ai_summary?: string | null;
          source_url: string;
          npm_package?: string | null;
          author?: string | null;
          license?: string | null;
          transport?: "stdio" | "http" | "sse" | null;
          trust_score?: number | null;
          grade?: "A" | "B" | "C" | "D" | "F" | null;
          github_stars?: number;
          last_commit?: string | null;
          open_issues?: number;
          has_tests?: boolean;
          has_typescript?: boolean;
          dependency_count?: number;
          categories?: string[];
          scanned_at?: string | null;
          scanned_version?: string | null;
          status?: "pending" | "scanning" | "complete" | "error";
        };
        Update: Partial<Database["public"]["Tables"]["servers"]["Insert"]>;
      };
      tools: {
        Row: {
          id: string;
          server_id: string;
          name: string;
          description: string | null;
          input_schema: Record<string, unknown> | null;
          security_flags: string[];
          description_honesty: "clean" | "suspicious" | "malicious";
          created_at: string;
        };
        Insert: {
          id?: string;
          server_id: string;
          name: string;
          description?: string | null;
          input_schema?: Record<string, unknown> | null;
          security_flags?: string[];
          description_honesty?: "clean" | "suspicious" | "malicious";
        };
        Update: Partial<Database["public"]["Tables"]["tools"]["Insert"]>;
      };
      findings: {
        Row: {
          id: string;
          server_id: string;
          severity: "critical" | "high" | "medium" | "low" | "info";
          category: string;
          title: string;
          description: string | null;
          evidence: string | null;
          location: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          server_id: string;
          severity: "critical" | "high" | "medium" | "low" | "info";
          category: string;
          title: string;
          description?: string | null;
          evidence?: string | null;
          location?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["findings"]["Insert"]>;
      };
    };
  };
};

export type Server = Database["public"]["Tables"]["servers"]["Row"];
export type Tool = Database["public"]["Tables"]["tools"]["Row"];
export type Finding = Database["public"]["Tables"]["findings"]["Row"];
