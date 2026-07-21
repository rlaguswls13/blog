# Devlog comments setup

Devlog post comments use [giscus](https://giscus.app/ko), which stores each post's thread in GitHub Discussions.

## One-time GitHub setup

1. Open `rlaguswls13/giscus-blog` on GitHub and enable **Settings → Features → Discussions**.
2. Install the [giscus GitHub App](https://github.com/apps/giscus) for this repository.
3. Confirm that the `Announcements` category is available.
4. Run either Pages deployment workflow again.

The repository name, repository ID, category, and category ID are public identifiers that must be sent to the browser. They are kept in the component and do not need GitHub Actions secrets or environment variables.

## Thread mapping

Each Discussion is mapped from the page URL pathname, matching the generated giscus configuration:

```text
/devlog/{category}/{id}
```

## Theme

The giscus iframe uses the custom styles in `public/giscus-themes`. The comment theme follows the blog's `theme-light` and `theme-dark` classes and updates immediately when the theme toggle is used. Reactions are disabled to keep the empty comment area compact.
