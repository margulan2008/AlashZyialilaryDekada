How to update leader images in `all-leaders.html`

1) Prepare a CSV `image-mapping.csv` with headers `name,url` (UTF-8). The `name` must exactly match the full name shown in the `.leader-name` elements in `all-leaders.html`.

Example:

name,url
Әлихан Бөкейхан,https://.../Alihan.jpg
Ахмет Байтұрсынұлы,https://.../Ahmet.jpg

2) Place `image-mapping.csv` in the project root (same folder as `all-leaders.html`).

3) Run the script (Python 3):

```bash
python3 scripts/apply_image_mapping.py image-mapping.csv
```

4) The script will create `all-leaders.html.bak` as a backup and overwrite `all-leaders.html` with updated `src` attributes.

Notes & guidance:
- Use HTTPS image URLs hosted on reliable sources (Wikimedia Commons, official museum archives, your own CDN).
- The script performs exact name matching. If a name in the CSV doesn't exactly match the HTML, the image won't be applied.
- After running, open `all-leaders.html` in a browser to verify images load correctly.
- If you'd like, I can try to automatically fetch a set of candidate Wikimedia Commons images and produce a proposed CSV — but I can't run web search from this workspace without explicit instructions. If you want that, tell me and I will outline the exact queries and produce a candidate CSV you can review.
