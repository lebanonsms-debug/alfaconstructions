import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { CmsPage, CmsSection, CmsCategory, CmsContentBlock, CmsHeroSlide } from '@/types';

export function useCmsPage(slug: string) {
  const [page, setPage] = useState<CmsPage | null>(null);
  const [sections, setSections] = useState<CmsSection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPage();
  }, [slug]);

  const fetchPage = async () => {
    try {
      setLoading(true);
      const { data: pageData } = await supabase
        .from('cms_pages')
        .select('*')
        .eq('slug', slug)
        .eq('status', 'published')
        .single();

      if (pageData) {
        setPage(pageData);
        const { data: sectionData } = await supabase
          .from('cms_sections')
          .select('*')
          .eq('page_id', pageData.id)
          .eq('visible', true)
          .order('display_order');
        if (sectionData) setSections(sectionData);
      }
    } catch (error) {
      console.error('Error fetching CMS page:', error);
    } finally {
      setLoading(false);
    }
  };

  return { page, sections, loading };
}

export function useCmsCategories() {
  const [categories, setCategories] = useState<CmsCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const { data } = await supabase
        .from('cms_categories')
        .select('*')
        .eq('visible', true)
        .order('display_order');
      if (data) setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  return { categories, loading };
}

export function useCmsContentBlock(key: string) {
  const [block, setBlock] = useState<CmsContentBlock | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlock();
  }, [key]);

  const fetchBlock = async () => {
    try {
      const { data } = await supabase
        .from('cms_content_blocks')
        .select('*')
        .eq('block_key', key)
        .single();
      if (data) setBlock(data);
    } catch (error) {
      console.error('Error fetching content block:', error);
    } finally {
      setLoading(false);
    }
  };

  return { block, loading };
}

export function useCmsHeroSlides() {
  const [slides, setSlides] = useState<CmsHeroSlide[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSlides();
  }, []);

  const fetchSlides = async () => {
    try {
      const { data } = await supabase
        .from('cms_hero_slides')
        .select('*')
        .eq('visible', true)
        .order('display_order');
      if (data) setSlides(data);
    } catch (error) {
      console.error('Error fetching hero slides:', error);
    } finally {
      setLoading(false);
    }
  };

  return { slides, loading };
}
