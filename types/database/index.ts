export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
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
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          }
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
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          }
        ]
      }
      campaign_members: {
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
            referencedRelation: "campaigns"
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
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      campaigns: {
        Row: {
          archived: boolean
          banner_src: string | null
          created_at: string | null
          description: string | null
          discord_link: string | null
          email: string | null
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
          id?: number
          name?: string | null
          slug?: string
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
          }
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
          }
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
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "mp_refinements_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "player_characters"
            referencedColumns: ["id"]
          }
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
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          }
        ]
      }
      player_characters: {
        Row: {
          active: boolean
          campaign: number
          created_at: string | null
          id: number
          img_src: string
          level: number
          name: string | null
          status: string
        }
        Insert: {
          active?: boolean
          campaign: number
          created_at?: string | null
          id?: number
          img_src?: string
          level?: number
          name?: string | null
          status?: string
        }
        Update: {
          active?: boolean
          campaign?: number
          created_at?: string | null
          id?: number
          img_src?: string
          level?: number
          name?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "player_characters_campaign_fkey"
            columns: ["campaign"]
            isOneToOne: false
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          }
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
        Relationships: [
          {
            foreignKeyName: "profile_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      quest: {
        Row: {
          campaign_id: number
          created_at: string
          description: string
          finished: boolean
          id: number
          name: string
          pinned: boolean
        }
        Insert: {
          campaign_id: number
          created_at?: string
          description?: string
          finished?: boolean
          id?: number
          name?: string
          pinned?: boolean
        }
        Update: {
          campaign_id?: number
          created_at?: string
          description?: string
          finished?: boolean
          id?: number
          name?: string
          pinned?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "quest_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          }
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
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quest_note_quest_id_fkey"
            columns: ["quest_id"]
            isOneToOne: false
            referencedRelation: "quest"
            referencedColumns: ["id"]
          }
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
        Relationships: [
          {
            foreignKeyName: "roles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
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
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          }
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
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
