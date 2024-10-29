from PIL import Image, ImageDraw, ImageFont

THUMBNAIL_SIZE = '280x280'

# https://enzedonline.com/en/tech-blog/create-image-thumbnails-with-preserved-edges-using-python-image-library/

"""
def get_thumbnail(original):
    original_path, original_filename = os.path.split(original)
    thumbnail_filename = generate_filename(
            original_filename, aspect_to_string(size)
        )

    original_filepath = os.path.join(self.root_directory, original_path, original_filename)
    thumbnail_filepath = os.path.join(
        self.thumbnail_directory, original_path, thumbnail_filename
    )
    thumbnail_url = os.path.join(self.thumbnail_url, original_path, thumbnail_filename)

    if storage.exists(thumbnail_filepath):
        return thumbnail_url

    image = Image.open(BytesIO(storage.read(original_filepath)))
    try:
        image.load()
    except (IOError, OSError):
        self.app.logger.warning("Thumbnail not load image: %s", original_filepath)
        return thumbnail_url

    # get original image format
    options["format"] = options.get("format", image.format)

    image = self._create_thumbnail(image, thumbnail_size, crop, background=background)

    raw_data = self.get_raw_data(image, **options)
    storage.save(thumbnail_filepath, raw_data)

    return thumbnail_url

    resized = contain(image, THUMBNAIL_SIZE, Image.Resampling.LANCZOS)
    if resized.size == size:
        out = resized
    else:
        out = Image.new(image.mode, size, color)
        if resized.palette:
            out.putpalette(resized.getpalette())
        if resized.width != size[0]:
            x = round((size[0] - resized.width) * max(0, min(centering[0], 1)))
            out.paste(resized, (x, 0))
        else:
            y = round((size[1] - resized.height) * max(0, min(centering[1], 1)))
            out.paste(resized, (0, y))
    return out
"""


def add_watermark(image: Image, file_path):
    image_mode = image.mode

    text = 'simarket.online'
    font = ImageFont.truetype('OpenSans-Semibold.ttf', 10)
    text_width = font.getlength(text)
    font_size = int(image.size[0] / 3 / text_width * 10)
    stroke_width = int(font_size / 20)
    font = ImageFont.truetype('OpenSans-Semibold.ttf', font_size)
    text_width = font.getlength(text)

    watermark = Image.new('RGBA', image.size, (255, 255, 255, 0))
    draw = ImageDraw.Draw(watermark)
    position = ((image.size[0] - text_width) / 2, (image.size[1] - font_size) / 2)
    draw.text(position, text, font=font, fill=(255, 255, 255, 64), stroke_fill=(128, 128, 128, 64), stroke_width=stroke_width)

    combined = Image.alpha_composite(image.convert('RGBA'), watermark)
    combined.convert(image_mode).save(file_path)
