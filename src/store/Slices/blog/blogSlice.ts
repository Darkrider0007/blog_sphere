// src/store/slices/blogSlice.ts
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface Author {
  name: string;
  username: string;
  twitter_username: string | null;
  github_username: string | null;
  user_id: number;
  website_url: string | null;
  profile_image: string;
  profile_image_90: string;
}

interface Blog {
  id: number;
  title: string;
  description: string;
  cover_image: string;
  user: Author;
  url: string;
  published_timestamp: Date;
  reading_time_minutes: number;
  publishingTime: string;
  readable_publish_date: string;
  tag_list: string[];
  tags: string[];
}

interface BlogState {
  blogs: Blog[];
  authors: Author[];
  authorArticles: Blog[]; // New state to hold author-specific articles
  loading: boolean;
  error: string | null;
}

const initialState: BlogState = {
  blogs: [],
  authors: [],
  authorArticles: [],
  loading: false,
  error: null,
};

export const fetchBlogs = createAsyncThunk("blogs/fetchBlogs", async () => {
  const response = await axios.get("https://dev.to/api/articles");

  const blogs = response.data.filter((blog: Blog) => blog.cover_image !== null);
  const uniqueAuthors: { [key: number]: Author } = {};
  blogs.forEach((blog: Blog) => {
    const author = blog.user;
    if (!uniqueAuthors[author.user_id]) {
      uniqueAuthors[author.user_id] = author;
    }
  });

  const authors = Object.values(uniqueAuthors);

  return { blogs, authors };
});

// Fetch articles of a specific author
export const fetchAuthorArticles = createAsyncThunk(
  "blogs/fetchAuthorArticles",
  async (username: string) => {
    const response = await axios.get(
      `https://dev.to/api/articles?username=${username}`
    );
    return response.data;
  }
);

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchBlogs.fulfilled,
        (
          state,
          action: PayloadAction<{ blogs: Blog[]; authors: Author[] }>
        ) => {
          state.loading = false;
          state.blogs = action.payload.blogs;
          state.authors = action.payload.authors;
        }
      )
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch blogs";
      })
      // Fetch Author Articles
      .addCase(fetchAuthorArticles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchAuthorArticles.fulfilled,
        (state, action: PayloadAction<Blog[]>) => {
          state.loading = false;
          state.authorArticles = action.payload;
        }
      )
      .addCase(fetchAuthorArticles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch author articles";
      });
  },
});

export default blogSlice.reducer;
