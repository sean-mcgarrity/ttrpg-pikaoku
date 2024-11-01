export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      campaign: {
        Row: {
          archived: boolean
          banner_src: string | null
          created_at: string | null
          description: string | null
          discord_link: string | null
          email: string | null
          game_system_id: number
          id: number
          name: string | null
          slug: string
        }
        Insert: {
          archived?: boolean
          banner_src?: string | null
          created_at?: string | null
          description?: string | null
          discord_link?: string | null
          email?: string | null
          game_system_id: number
          id?: number
          name?: string | null
          slug?: string
        }
        Update: {
          archived?: boolean
          banner_src?: string | null
          created_at?: string | null
          description?: string | null
          discord_link?: string | null
          email?: string | null
          game_system_id?: number
          id?: number
          name?: string | null
          slug?: string
        }
        Relationships: [
          {
            foreignKeyName: "campaign_game_system_id_fkey"
            columns: ["game_system_id"]
            isOneToOne: false
            referencedRelation: "game_system"
            referencedColumns: ["id"]
          },
        ]
      }
      campaign_features: {
        Row: {
          campaign_id: number
          feature: string
          id: number
        }
        Insert: {
          campaign_id: number
          feature: string
          id?: number
        }
        Update: {
          campaign_id?: number
          feature?: string
          id?: number
        }
        Relationships: [
          {
            foreignKeyName: "campaign_features_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaign"
            referencedColumns: ["id"]
          },
        ]
      }
      campaign_handout: {
        Row: {
          campaign_id: number
          created_at: string
          id: number
          label: string
          link: string
          type: string | null
        }
        Insert: {
          campaign_id: number
          created_at?: string
          id?: number
          label: string
          link: string
          type?: string | null
        }
        Update: {
          campaign_id?: number
          created_at?: string
          id?: number
          label?: string
          link?: string
          type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "campaign_handout_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaign"
            referencedColumns: ["id"]
          },
        ]
      }
      campaign_invite: {
        Row: {
          campaign_id: number
          created_at: string
          expires: string | null
          id: string
          max_uses: number
        }
        Insert: {
          campaign_id: number
          created_at?: string
          expires?: string | null
          id?: string
          max_uses?: number
        }
        Update: {
          campaign_id?: number
          created_at?: string
          expires?: string | null
          id?: string
          max_uses?: number
        }
        Relationships: [
          {
            foreignKeyName: "campaign_invite_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaign"
            referencedColumns: ["id"]
          },
        ]
      }
      campaign_member: {
        Row: {
          campaign_id: number
          campaign_invite_id: string
          created_at: string | null
          id: number
          is_gm: boolean
          user_id: string
        }
        Insert: {
          campaign_id: number
          campaign_invite_id: string
          created_at?: string | null
          id?: number
          is_gm?: boolean
          user_id: string
        }
        Update: {
          campaign_id?: number
          campaign_invite_id?: string
          created_at?: string | null
          id?: number
          is_gm?: boolean
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "campaign_members_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaign"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaign_members_campaign_invite_id_fkey"
            columns: ["campaign_invite_id"]
            isOneToOne: false
            referencedRelation: "campaign_invite"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaign_members_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["id"]
          },
        ]
      }
      character: {
        Row: {
          active: boolean
          created_at: string | null
          id: number
          img_src: string
          name: string | null
          player_id: string | null
        }
        Insert: {
          active?: boolean
          created_at?: string | null
          id?: number
          img_src?: string
          name?: string | null
          player_id?: string | null
        }
        Update: {
          active?: boolean
          created_at?: string | null
          id?: number
          img_src?: string
          name?: string | null
          player_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "player_characters_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["id"]
          },
        ]
      }
      game_system: {
        Row: {
          id: number
          label: string | null
          name: string
        }
        Insert: {
          id?: number
          label?: string | null
          name: string
        }
        Update: {
          id?: number
          label?: string | null
          name?: string
        }
        Relationships: []
      }
      mp_base_items: {
        Row: {
          cost: number
          created_at: string
          description: string
          key: string
          name: string
          requires: string[]
          type: string
        }
        Insert: {
          cost?: number
          created_at?: string
          description?: string
          key: string
          name: string
          requires?: string[]
          type?: string
        }
        Update: {
          cost?: number
          created_at?: string
          description?: string
          key?: string
          name?: string
          requires?: string[]
          type?: string
        }
        Relationships: []
      }
      mp_imbuements: {
        Row: {
          category: string | null
          created_at: string | null
          description: string
          enabled: boolean
          icon_src: string | null
          id: number
          implemented: boolean
          levels: Json | null
          name: string
          requires: string[]
          type: string
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          description?: string
          enabled?: boolean
          icon_src?: string | null
          id?: number
          implemented?: boolean
          levels?: Json | null
          name?: string
          requires?: string[]
          type?: string
        }
        Update: {
          category?: string | null
          created_at?: string | null
          description?: string
          enabled?: boolean
          icon_src?: string | null
          id?: number
          implemented?: boolean
          levels?: Json | null
          name?: string
          requires?: string[]
          type?: string
        }
        Relationships: []
      }
      mp_refinement_changes: {
        Row: {
          amount: number
          created_at: string
          id: number
          imbuement_id: number | null
          refinement_id: number
          source_id: number | null
        }
        Insert: {
          amount?: number
          created_at?: string
          id?: number
          imbuement_id?: number | null
          refinement_id: number
          source_id?: number | null
        }
        Update: {
          amount?: number
          created_at?: string
          id?: number
          imbuement_id?: number | null
          refinement_id?: number
          source_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "mp_refinement_changes_imbuement_id_fkey"
            columns: ["imbuement_id"]
            isOneToOne: false
            referencedRelation: "mp_imbuements"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "mp_refinement_changes_refinement_id_fkey"
            columns: ["refinement_id"]
            isOneToOne: false
            referencedRelation: "mp_refinements"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "mp_refinement_changes_source_id_fkey"
            columns: ["source_id"]
            isOneToOne: false
            referencedRelation: "mp_sources"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "mp_refinement_changes_source_id_fkey"
            columns: ["source_id"]
            isOneToOne: false
            referencedRelation: "usable_sources"
            referencedColumns: ["id"]
          },
        ]
      }
      mp_refinement_imbuements: {
        Row: {
          created_at: string
          imbuement_id: number
          refinement_id: number
        }
        Insert: {
          created_at?: string
          imbuement_id: number
          refinement_id?: number
        }
        Update: {
          created_at?: string
          imbuement_id?: number
          refinement_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "mp_refinement_imbuements_imbuement_id_fkey"
            columns: ["imbuement_id"]
            isOneToOne: false
            referencedRelation: "mp_imbuements"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "mp_refinement_imbuements_refinement_id_fkey"
            columns: ["refinement_id"]
            isOneToOne: false
            referencedRelation: "mp_refinements"
            referencedColumns: ["id"]
          },
        ]
      }
      mp_refinements: {
        Row: {
          base_item_key: string
          campaign_id: number
          created_at: string | null
          description: string
          id: number
          name: string
          owner_id: number | null
          salvaged: boolean
          type: string
        }
        Insert: {
          base_item_key: string
          campaign_id: number
          created_at?: string | null
          description?: string
          id?: number
          name?: string
          owner_id?: number | null
          salvaged?: boolean
          type: string
        }
        Update: {
          base_item_key?: string
          campaign_id?: number
          created_at?: string | null
          description?: string
          id?: number
          name?: string
          owner_id?: number | null
          salvaged?: boolean
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "mp_refinements_base_item_key_fkey"
            columns: ["base_item_key"]
            isOneToOne: false
            referencedRelation: "mp_base_items"
            referencedColumns: ["key"]
          },
          {
            foreignKeyName: "mp_refinements_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaign"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "mp_refinements_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "character"
            referencedColumns: ["id"]
          },
        ]
      }
      mp_sources: {
        Row: {
          campaign_id: number
          created_at: string
          enables: string[]
          id: number
          img_src: string | null
          level: number | null
          name: string
          quantity: number
          remaining: number
          revealed: boolean
        }
        Insert: {
          campaign_id: number
          created_at?: string
          enables?: string[]
          id?: number
          img_src?: string | null
          level?: number | null
          name: string
          quantity?: number
          remaining: number
          revealed?: boolean
        }
        Update: {
          campaign_id?: number
          created_at?: string
          enables?: string[]
          id?: number
          img_src?: string | null
          level?: number | null
          name?: string
          quantity?: number
          remaining?: number
          revealed?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "mp_sources_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaign"
            referencedColumns: ["id"]
          },
        ]
      }
      pf2e_success_card: {
        Row: {
          action_cost: string
          campaign_id: number
          card_level: number
          card_type: string
          child_card_id: number | null
          created_at: string
          critical_failure: string
          critical_success: string
          description: string
          failure: string
          frequency: string | null
          id: number
          requirements: string | null
          success: string
          tags: string[]
          title: string
          trigger: string | null
        }
        Insert: {
          action_cost?: string
          campaign_id: number
          card_level: number
          card_type?: string
          child_card_id?: number | null
          created_at?: string
          critical_failure?: string
          critical_success?: string
          description?: string
          failure?: string
          frequency?: string | null
          id?: number
          requirements?: string | null
          success?: string
          tags?: string[]
          title?: string
          trigger?: string | null
        }
        Update: {
          action_cost?: string
          campaign_id?: number
          card_level?: number
          card_type?: string
          child_card_id?: number | null
          created_at?: string
          critical_failure?: string
          critical_success?: string
          description?: string
          failure?: string
          frequency?: string | null
          id?: number
          requirements?: string | null
          success?: string
          tags?: string[]
          title?: string
          trigger?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_pf2e_success_card_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaign"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_pf2e_success_card_child_card_fkey"
            columns: ["child_card_id"]
            isOneToOne: false
            referencedRelation: "pf2e_success_card"
            referencedColumns: ["id"]
          },
        ]
      }
      profile: {
        Row: {
          avatar_src: string | null
          created_at: string
          id: string
          username: string | null
        }
        Insert: {
          avatar_src?: string | null
          created_at?: string
          id: string
          username?: string | null
        }
        Update: {
          avatar_src?: string | null
          created_at?: string
          id?: string
          username?: string | null
        }
        Relationships: []
      }
      quest: {
        Row: {
          campaign_id: number
          created_at: string
          creator_id: string | null
          description: string
          group: string
          id: number
          name: string
          status: Database["public"]["Enums"]["quest_status"]
          summary: string | null
        }
        Insert: {
          campaign_id: number
          created_at?: string
          creator_id?: string | null
          description?: string
          group?: string
          id?: number
          name?: string
          status?: Database["public"]["Enums"]["quest_status"]
          summary?: string | null
        }
        Update: {
          campaign_id?: number
          created_at?: string
          creator_id?: string | null
          description?: string
          group?: string
          id?: number
          name?: string
          status?: Database["public"]["Enums"]["quest_status"]
          summary?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "quest_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaign"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quest_creator_id_fkey"
            columns: ["creator_id"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["id"]
          },
        ]
      }
      quest_note: {
        Row: {
          author_id: string | null
          content: string
          created_at: string
          id: number
          quest_id: number
        }
        Insert: {
          author_id?: string | null
          content?: string
          created_at?: string
          id?: number
          quest_id: number
        }
        Update: {
          author_id?: string | null
          content?: string
          created_at?: string
          id?: number
          quest_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "quest_note_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quest_note_quest_id_fkey"
            columns: ["quest_id"]
            isOneToOne: false
            referencedRelation: "quest"
            referencedColumns: ["id"]
          },
        ]
      }
      quest_pinned: {
        Row: {
          campaign_id: number
          quest_id: number | null
        }
        Insert: {
          campaign_id: number
          quest_id?: number | null
        }
        Update: {
          campaign_id?: number
          quest_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "quest_pinned_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: true
            referencedRelation: "campaign"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quest_pinned_quest_id_fkey"
            columns: ["quest_id"]
            isOneToOne: false
            referencedRelation: "quest"
            referencedColumns: ["id"]
          },
        ]
      }
      roles: {
        Row: {
          id: number
          role: string
          user_id: string
        }
        Insert: {
          id?: number
          role?: string
          user_id: string
        }
        Update: {
          id?: number
          role?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      quest_groups: {
        Row: {
          campaign_id: number | null
          group: string | null
        }
        Relationships: [
          {
            foreignKeyName: "quest_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaign"
            referencedColumns: ["id"]
          },
        ]
      }
      usable_sources: {
        Row: {
          campaign_id: number | null
          created_at: string | null
          enables: string[] | null
          id: number | null
          img_src: string | null
          level: number | null
          name: string | null
          quantity: number | null
          remaining: number | null
          revealed: boolean | null
          total: number | null
          usable: number | null
          usage: number | null
        }
        Relationships: [
          {
            foreignKeyName: "mp_sources_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaign"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      get_campaign_id_from_refinement_id: {
        Args: {
          target_refinement_id: number
        }
        Returns: number
      }
      im_in_campaign: {
        Args: {
          target_campaign_id: number
        }
        Returns: boolean
      }
      is_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      user_is_in_campaign: {
        Args: {
          target_campaign_id: number
          target_user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      quest_status: "none" | "pinned" | "finished" | "starred" | "deleted"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
