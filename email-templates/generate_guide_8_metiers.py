"""
Génère le guide PDF LaPasseTech V2 — "Les 8 métiers du digital accessibles sans coder"
Design system V2 exact (couleurs, typographie, structure 20 pages)
"""
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.units import mm, cm
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle,
    PageBreak, HRFlowable, KeepTogether
)
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_RIGHT
from reportlab.platypus import Flowable
from reportlab.pdfgen import canvas as pdfcanvas
from reportlab.lib.colors import HexColor
import os

# ── Design tokens ────────────────────────────────────────────────────────────
C_CARAMEL       = HexColor('#9C5A2C')
C_CARAMEL_DEEP  = HexColor('#5C2E10')
C_CARAMEL_SOFT  = HexColor('#F2E2CC')
C_GREEN         = HexColor('#16B877')
C_GREEN_SOFT    = HexColor('#D4F5E9')
C_YELLOW        = HexColor('#F5C542')
C_INK           = HexColor('#2A2520')
C_BLACK         = HexColor('#1A1714')
C_GRAY          = HexColor('#6B655D')
C_GRAY_LT       = HexColor('#9A9388')
C_GRAY_LIGHT    = HexColor('#B5AE9F')
C_PAPER         = HexColor('#FFFFFF')
C_CREAM         = HexColor('#F8F4EB')
C_CREAM_BG      = HexColor('#FAF8F5')
C_BEIGE         = HexColor('#EFE6D2')
C_BORDER        = HexColor('#E5DDC9')
C_BORDER_SOFT   = HexColor('#EFE9D9')

W, H = A4  # 595.28 x 841.89 pt
MARGIN_H = 14 * mm
MARGIN_V = 14 * mm
TEXT_W = W - 2 * MARGIN_H

OUTPUT_PATH = os.path.join(os.path.dirname(__file__), "../public/guide-8-metiers-lapassetech.pdf")
os.makedirs(os.path.dirname(OUTPUT_PATH), exist_ok=True)

# ── Styles de paragraphe ─────────────────────────────────────────────────────
def S(name, **kw):
    return ParagraphStyle(name, **kw)

s_cover_title = S('CoverTitle',
    fontName='Helvetica-Bold', fontSize=28, leading=32,
    textColor=C_INK, spaceAfter=10, letterSpacing=-0.5)
s_cover_sub = S('CoverSub',
    fontName='Helvetica', fontSize=15, leading=22,
    textColor=C_GRAY, spaceAfter=16)
s_eyebrow = S('Eyebrow',
    fontName='Helvetica-Bold', fontSize=9, leading=14,
    textColor=C_CARAMEL, spaceAfter=6, spaceBefore=4,
    wordWrap='CJK')
s_eyebrow_green = S('EyebrowGreen',
    fontName='Helvetica-Bold', fontSize=9, leading=14,
    textColor=C_GREEN, spaceAfter=6, spaceBefore=4)
s_h1 = S('H1',
    fontName='Helvetica-Bold', fontSize=22, leading=26,
    textColor=C_INK, spaceAfter=10, spaceBefore=8, letterSpacing=-0.3)
s_h2 = S('H2',
    fontName='Helvetica-Bold', fontSize=17, leading=22,
    textColor=C_INK, spaceAfter=8, spaceBefore=14, letterSpacing=-0.2)
s_h3 = S('H3',
    fontName='Helvetica-Bold', fontSize=13, leading=17,
    textColor=C_INK, spaceAfter=5, spaceBefore=10)
s_body = S('Body',
    fontName='Helvetica', fontSize=10.5, leading=16,
    textColor=C_GRAY, spaceAfter=8)
s_body_strong = S('BodyStrong',
    fontName='Helvetica-Bold', fontSize=10.5, leading=16,
    textColor=C_INK, spaceAfter=6)
s_body_dark = S('BodyDark',
    fontName='Helvetica', fontSize=10.5, leading=16,
    textColor=C_CREAM, spaceAfter=6)
s_small = S('Small',
    fontName='Helvetica', fontSize=9, leading=13,
    textColor=C_GRAY_LT, spaceAfter=4)
s_small_dark = S('SmallDark',
    fontName='Helvetica', fontSize=9, leading=13,
    textColor=C_GRAY_LT, spaceAfter=4)
s_metric_val = S('MetricVal',
    fontName='Helvetica-Bold', fontSize=13, leading=16,
    textColor=C_INK, spaceAfter=2)
s_metric_label = S('MetricLabel',
    fontName='Helvetica', fontSize=8.5, leading=12,
    textColor=C_GRAY_LT, spaceAfter=0)
s_badge = S('Badge',
    fontName='Helvetica-Bold', fontSize=8, leading=11,
    textColor=C_PAPER, spaceAfter=0)
s_checklist_num = S('CheckNum',
    fontName='Helvetica-Bold', fontSize=13, leading=16,
    textColor=C_CARAMEL, spaceAfter=0)
s_toc_num = S('TocNum',
    fontName='Helvetica-Bold', fontSize=11, leading=15,
    textColor=C_CARAMEL)
s_toc_title = S('TocTitle',
    fontName='Helvetica-Bold', fontSize=11, leading=15,
    textColor=C_INK)
s_toc_sub = S('TocSub',
    fontName='Helvetica', fontSize=9, leading=13,
    textColor=C_GRAY_LT)
s_toc_page = S('TocPage',
    fontName='Helvetica', fontSize=9, leading=13,
    textColor=C_GRAY_LT, alignment=TA_RIGHT)
s_center = S('Center',
    fontName='Helvetica', fontSize=10.5, leading=16,
    textColor=C_GRAY, alignment=TA_CENTER, spaceAfter=8)
s_quote = S('Quote',
    fontName='Helvetica-Oblique', fontSize=13, leading=20,
    textColor=C_CARAMEL, spaceAfter=8, spaceBefore=6, leftIndent=12)
s_error_title = S('ErrorTitle',
    fontName='Helvetica-Bold', fontSize=11, leading=15,
    textColor=C_INK, spaceAfter=3)
s_resource_family = S('ResFamily',
    fontName='Helvetica-Bold', fontSize=9.5, leading=13,
    textColor=C_CARAMEL, spaceAfter=2)
s_resource_item = S('ResItem',
    fontName='Helvetica', fontSize=9.5, leading=14,
    textColor=C_GRAY, spaceAfter=3)
s_cta_title = S('CTATitle',
    fontName='Helvetica-Bold', fontSize=16, leading=20,
    textColor=C_PAPER, spaceAfter=6, alignment=TA_CENTER)
s_cta_sub = S('CTASub',
    fontName='Helvetica', fontSize=10.5, leading=15,
    textColor=C_CARAMEL_SOFT, spaceAfter=14, alignment=TA_CENTER)
s_cta_url = S('CTAUrl',
    fontName='Helvetica-Bold', fontSize=11, leading=16,
    textColor=C_PAPER, spaceAfter=4)
s_cta_url_label = S('CTAUrlLabel',
    fontName='Helvetica', fontSize=9.5, leading=13,
    textColor=C_CARAMEL_SOFT, spaceAfter=10)
s_back_tagline = S('BackTagline',
    fontName='Helvetica-Oblique', fontSize=13, leading=20,
    textColor=C_GRAY_LIGHT, alignment=TA_CENTER, spaceAfter=0)
s_back_url = S('BackUrl',
    fontName='Helvetica-Bold', fontSize=11, leading=16,
    textColor=C_CREAM, alignment=TA_CENTER, spaceAfter=4)
s_about_body = S('AboutBody',
    fontName='Helvetica', fontSize=10.5, leading=17,
    textColor=C_GRAY, spaceAfter=8)

# ── Custom Flowables ─────────────────────────────────────────────────────────
class HR(HRFlowable):
    def __init__(self, color=C_BORDER, thickness=0.75, spaceAfter=8, spaceBefore=8):
        super().__init__(width='100%', thickness=thickness,
                         color=color, spaceAfter=spaceAfter, spaceBefore=spaceBefore)

class ColorRect(Flowable):
    """Solid colored rectangle, full text width."""
    def __init__(self, height, color, radius=0, width=None):
        super().__init__()
        self._h = height
        self._color = color
        self._r = radius
        self._w = width
    def wrap(self, availW, availH):
        self.width = self._w or availW
        self.height = self._h
        return self.width, self.height
    def draw(self):
        self.canv.setFillColor(self._color)
        if self._r:
            self.canv.roundRect(0, 0, self.width, self._h, self._r, fill=1, stroke=0)
        else:
            self.canv.rect(0, 0, self.width, self._h, fill=1, stroke=0)

class BadgePill(Flowable):
    """Colored pill badge with text."""
    def __init__(self, text, bg_color=C_CARAMEL, fg_color=C_PAPER, font_size=8):
        super().__init__()
        self._text = text
        self._bg = bg_color
        self._fg = fg_color
        self._fs = font_size
        self._pad_h = 10
        self._pad_v = 4
    def wrap(self, availW, availH):
        self.width = len(self._text) * self._fs * 0.55 + self._pad_h * 2
        self.height = self._fs + self._pad_v * 2
        return self.width, self.height
    def draw(self):
        r = self.height / 2
        self.canv.setFillColor(self._bg)
        self.canv.roundRect(0, 0, self.width, self.height, r, fill=1, stroke=0)
        self.canv.setFillColor(self._fg)
        self.canv.setFont('Helvetica-Bold', self._fs)
        self.canv.drawCentredString(self.width / 2, self._pad_v + 1, self._text)

class MetricRow(Flowable):
    """3-column metrics bar."""
    def __init__(self, metrics):  # metrics = [(label, value), ...]
        super().__init__()
        self._metrics = metrics
    def wrap(self, availW, availH):
        self.width = availW
        self.height = 44
        return self.width, self.height
    def draw(self):
        c = self.canv
        n = len(self._metrics)
        col_w = self.width / n
        for i, (label, value) in enumerate(self._metrics):
            x = i * col_w
            # Separator
            if i > 0:
                c.setStrokeColor(C_BORDER)
                c.setLineWidth(0.5)
                c.line(x, 4, x, self.height - 4)
            # Value
            c.setFillColor(C_INK)
            c.setFont('Helvetica-Bold', 12)
            c.drawString(x + 8, 24, value)
            # Label
            c.setFillColor(C_GRAY_LT)
            c.setFont('Helvetica', 8)
            c.drawString(x + 8, 10, label)

class SectionTag(Flowable):
    """Left-colored section tag like '→ CE QUE TU FAIS'."""
    def __init__(self, text, color=C_CARAMEL):
        super().__init__()
        self._text = text
        self._color = color
    def wrap(self, availW, availH):
        self.width = availW
        self.height = 20
        return self.width, self.height
    def draw(self):
        c = self.canv
        c.setFillColor(self._color)
        c.rect(0, 2, 3, 14, fill=1, stroke=0)
        c.setFont('Helvetica-Bold', 8.5)
        c.drawString(10, 6, self._text)

class NumberedStep(Flowable):
    """Checklist step with caramel number."""
    def __init__(self, number, title, subtitle='', done=False):
        super().__init__()
        self._num = str(number).zfill(2)
        self._title = title
        self._sub = subtitle
        self._done = done
    def wrap(self, availW, availH):
        self.width = availW
        self.height = 38 if self._sub else 28
        return self.width, self.height
    def draw(self):
        c = self.canv
        # Number circle
        c.setFillColor(C_CARAMEL_SOFT)
        c.circle(14, self.height / 2, 12, fill=1, stroke=0)
        c.setFillColor(C_CARAMEL)
        c.setFont('Helvetica-Bold', 9)
        c.drawCentredString(14, self.height / 2 - 4, self._num)
        # Title
        c.setFillColor(C_INK)
        c.setFont('Helvetica-Bold', 10.5)
        c.drawString(34, self.height - 14, self._title)
        # Subtitle
        if self._sub:
            c.setFillColor(C_GRAY)
            c.setFont('Helvetica', 9)
            c.drawString(34, self.height - 28, self._sub)

# ── Page templates ────────────────────────────────────────────────────────────
class LPTPageTemplate:
    """Handles page numbering and footer for content pages."""
    def __init__(self, page_number_start=2, skip_pages=(1, 20)):
        self._start = page_number_start
        self._skip = skip_pages
        self._current = 0

    def on_page(self, canv, doc):
        self._current += 1
        if self._current in self._skip:
            return
        canv.saveState()
        # Footer line
        canv.setStrokeColor(C_BORDER)
        canv.setLineWidth(0.5)
        canv.line(MARGIN_H, 18 * mm, W - MARGIN_H, 18 * mm)
        # Page number
        canv.setFillColor(C_GRAY_LT)
        canv.setFont('Helvetica', 8)
        canv.drawCentredString(W / 2, 14 * mm,
            f'LaPasseTech — Guide PDF — Page {self._current}')
        # Brand
        canv.setFont('Helvetica-Bold', 8)
        canv.setFillColor(C_CARAMEL)
        canv.drawString(MARGIN_H, 14 * mm, 'LaPasseTech')
        canv.restoreState()

# ── Helper builders ──────────────────────────────────────────────────────────
def card(content_rows, bg=C_CREAM, border=C_BORDER, radius=6,
         col_widths=None, row_heights=None, pad=8):
    """Wrap a list of flowable rows in a styled card table."""
    data = [[item] for item in content_rows]
    col_w = col_widths or [TEXT_W - 2]
    style = TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), bg),
        ('BOX', (0, 0), (-1, -1), 0.75, border),
        ('ROUNDEDCORNERS', [radius]),
        ('TOPPADDING', (0, 0), (-1, -1), pad),
        ('BOTTOMPADDING', (0, 0), (-1, -1), pad),
        ('LEFTPADDING', (0, 0), (-1, -1), pad + 4),
        ('RIGHTPADDING', (0, 0), (-1, -1), pad + 4),
    ])
    t = Table(data, colWidths=col_w, rowHeights=row_heights)
    t.setStyle(style)
    return t

def two_col_card(left_items, right_items,
                 bg=C_CREAM, border=C_BORDER, radius=6):
    """Two-column card."""
    lw = TEXT_W * 0.5 - 2
    rw = TEXT_W * 0.5 - 2

    def col(items):
        t = Table([[i] for i in items], colWidths=[lw - 12])
        t.setStyle(TableStyle([
            ('TOPPADDING', (0,0),(-1,-1), 3),
            ('BOTTOMPADDING', (0,0),(-1,-1), 3),
            ('LEFTPADDING', (0,0),(-1,-1), 0),
            ('RIGHTPADDING', (0,0),(-1,-1), 0),
        ]))
        return t

    data = [[col(left_items), col(right_items)]]
    outer = Table(data, colWidths=[lw, rw])
    outer.setStyle(TableStyle([
        ('BACKGROUND', (0,0),(-1,-1), bg),
        ('BOX', (0,0),(-1,-1), 0.75, border),
        ('ROUNDEDCORNERS', [radius]),
        ('TOPPADDING', (0,0),(-1,-1), 10),
        ('BOTTOMPADDING', (0,0),(-1,-1), 10),
        ('LEFTPADDING', (0,0),(-1,-1), 12),
        ('RIGHTPADDING', (0,0),(-1,-1), 12),
        ('VALIGN', (0,0),(-1,-1), 'TOP'),
    ]))
    return outer

def dark_card(items, bg=C_BLACK, radius=8):
    data = [[item] for item in items]
    t = Table(data, colWidths=[TEXT_W - 2])
    t.setStyle(TableStyle([
        ('BACKGROUND', (0,0),(-1,-1), bg),
        ('ROUNDEDCORNERS', [radius]),
        ('TOPPADDING', (0,0),(-1,-1), 12),
        ('BOTTOMPADDING', (0,0),(-1,-1), 12),
        ('LEFTPADDING', (0,0),(-1,-1), 16),
        ('RIGHTPADDING', (0,0),(-1,-1), 16),
    ]))
    return t

def accent_card(items, bg=C_CARAMEL, radius=8):
    data = [[item] for item in items]
    t = Table(data, colWidths=[TEXT_W - 2])
    t.setStyle(TableStyle([
        ('BACKGROUND', (0,0),(-1,-1), bg),
        ('ROUNDEDCORNERS', [radius]),
        ('TOPPADDING', (0,0),(-1,-1), 14),
        ('BOTTOMPADDING', (0,0),(-1,-1), 14),
        ('LEFTPADDING', (0,0),(-1,-1), 18),
        ('RIGHTPADDING', (0,0),(-1,-1), 18),
    ]))
    return t

def sp(n=6):
    return Spacer(1, n)

def metier_page(story, badge_text, badge_color, title, metrics,
                ce_que, competences, profils, premiere_etape):
    """Build a standard fiche métier page."""
    # Badge
    story.append(BadgePill(badge_text, bg_color=badge_color))
    story.append(sp(6))
    # Title
    story.append(Paragraph(title, s_h1))
    story.append(sp(2))
    # Metrics bar in a card
    m_row = MetricRow(metrics)
    mc = card([m_row], bg=C_CREAM, pad=4)
    story.append(mc)
    story.append(sp(8))
    # Ce que tu fais
    story.append(SectionTag('CE QUE TU FAIS', C_CARAMEL))
    story.append(sp(4))
    story.append(Paragraph(ce_que, s_body))
    story.append(sp(4))
    # Compétences
    story.append(SectionTag('COMPETENCES REQUISES', C_CARAMEL))
    story.append(sp(4))
    for item in competences:
        story.append(Paragraph(f'<b>·</b> {item}', s_body))
    story.append(sp(4))
    # Profils
    story.append(SectionTag('PROFILS QUI REUSSISSENT', C_CARAMEL))
    story.append(sp(4))
    story.append(Paragraph(profils, s_body))
    story.append(sp(4))
    # Première étape — highlighted
    pe_card = card([
        Paragraph('PREMIERE ETAPE', s_eyebrow),
        Paragraph(premiere_etape, s_body_strong),
    ], bg=C_CARAMEL_SOFT, border=C_CARAMEL, pad=10)
    story.append(pe_card)
    story.append(PageBreak())

# ── Cover page (dessin natif canvas) ─────────────────────────────────────────
def draw_cover(c):
    """Couverture V3 — fond portrait simulé + filtre caramel (style carrousel)."""
    import random

    # ── 1. Fond de base chaud ─────────────────────────────────────────────────
    c.setFillColor(HexColor('#C8A882'))
    c.rect(0, 0, W, H, fill=1, stroke=0)

    # ── 2. Formes organiques chaudes — scène portrait/intérieur ──────────────
    c.saveState()
    c.setFillColor(HexColor('#E8D0B0'))
    c.ellipse(W * 0.55, H * 0.65, W * 1.1, H * 1.05, fill=1, stroke=0)
    c.restoreState()

    c.saveState()
    c.setFillColor(HexColor('#8B6040'))
    c.ellipse(W * 0.2, H * 0.15, W * 0.82, H * 0.88, fill=1, stroke=0)
    c.restoreState()

    c.saveState()
    c.setFillColor(HexColor('#D4A870'))
    c.ellipse(W * 0.28, H * 0.52, W * 0.74, H * 0.95, fill=1, stroke=0)
    c.restoreState()

    c.saveState()
    c.setFillColor(HexColor('#5A3820'))
    c.rect(0, 0, W * 0.22, H, fill=1, stroke=0)
    c.restoreState()

    c.saveState()
    c.setFillColor(HexColor('#4A2E18'))
    c.rect(0, 0, W, H * 0.18, fill=1, stroke=0)
    c.restoreState()

    c.saveState()
    c.setFillColor(HexColor('#E8C898'))
    c.ellipse(W * 0.38, H * 0.55, W * 0.65, H * 0.82, fill=1, stroke=0)
    c.restoreState()

    # ── 3. Filtre caramel semi-transparent ────────────────────────────────────
    c.saveState()
    c.setFillColor(C_CARAMEL)
    c.setFillAlpha(0.58)
    c.rect(0, 0, W, H, fill=1, stroke=0)
    c.restoreState()

    # ── 4. Grain photo ────────────────────────────────────────────────────────
    c.saveState()
    c.setFillColor(HexColor('#000000'))
    random.seed(42)
    c.setFillAlpha(0.03)
    for _ in range(2200):
        px = random.uniform(0, W)
        py = random.uniform(0, H)
        c.circle(px, py, 0.6, fill=1, stroke=0)
    c.restoreState()

    # ── 5. Vignette bas ───────────────────────────────────────────────────────
    c.saveState()
    n = 12
    for i in range(n):
        c.setFillColor(C_CARAMEL_DEEP)
        c.setFillAlpha((i / n) * 0.65 * 0.7)
        step_h = H * 0.38 / n
        c.rect(0, (i / n) * H * 0.38, W, step_h + 1, fill=1, stroke=0)
    c.restoreState()

    # ── 6. Vignette haut ──────────────────────────────────────────────────────
    c.saveState()
    n = 8
    for i in range(n):
        c.setFillColor(C_CARAMEL_DEEP)
        c.setFillAlpha(((n - i) / n) * 0.36)
        y_top = H - (i / n) * H * 0.30
        c.rect(0, y_top, W, H * 0.30 / n + 1, fill=1, stroke=0)
    c.restoreState()

    c.setFillAlpha(1.0)

    # ── 7. Barre jaune top ────────────────────────────────────────────────────
    c.setFillColor(C_YELLOW)
    c.rect(0, H - 3.5 * mm, W, 3.5 * mm, fill=1, stroke=0)

    # ── 8. Wordmark ───────────────────────────────────────────────────────────
    c.setFillColor(C_CREAM)
    c.setFont('Helvetica-Bold', 16)
    c.drawString(MARGIN_H, H - MARGIN_V - 6, 'LaPasseTech')
    c.setFillColor(HexColor('#F2E2CC'))
    c.setFont('Helvetica', 9)
    c.drawRightString(W - MARGIN_H, H - MARGIN_V - 6, 'GUIDE PDF  ·  2026')

    # ── 9. Eyebrow tracking ───────────────────────────────────────────────────
    c.setFillColor(C_CREAM)
    c.setFont('Helvetica-Bold', 8.5)
    eyebrow = 'RECONVERSION  SANS  BULLSHIT'
    c.drawString(MARGIN_H, H * 0.71, eyebrow)
    ew = len(eyebrow) * 5.2
    c.setStrokeColor(C_YELLOW)
    c.setLineWidth(1.5)
    c.line(MARGIN_H, H * 0.71 - 5, MARGIN_H + ew, H * 0.71 - 5)

    # ── 10. Barre verticale gauche accent jaune ───────────────────────────────
    tx = MARGIN_H
    ty = H * 0.44
    c.setFillColor(C_YELLOW)
    c.rect(tx - 4, ty - 66, 3, 150, fill=1, stroke=0)

    # ── 11. Titre ─────────────────────────────────────────────────────────────
    c.setFillColor(C_PAPER)
    c.setFont('Helvetica-Bold', 58)
    c.drawString(tx, ty + 44, 'Les 8')
    c.setFont('Helvetica-Bold', 48)
    c.drawString(tx, ty - 10, 'métiers du digital')

    c.setFillColor(C_CARAMEL_SOFT)
    c.setFont('Helvetica-BoldOblique', 30)
    c.drawString(tx, ty - 48, 'accessibles sans coder.')

    # ── 12. Sous-titre ────────────────────────────────────────────────────────
    c.setFillColor(C_CARAMEL_SOFT)
    c.setFont('Helvetica', 11.5)
    c.drawString(tx, ty - 72,
                 'Le guide honnête pour ta reconversion dans le digital')

    # ── 13. Auteur ────────────────────────────────────────────────────────────
    c.setFillColor(C_PAPER)
    c.setFont('Helvetica-Bold', 13)
    c.drawString(tx, H * 0.19 + 14, 'Guy')
    c.setFillColor(C_CARAMEL_SOFT)
    c.setFont('Helvetica', 10.5)
    c.drawString(tx, H * 0.19, 'Business Analyst  ·  Fondateur de LaPasseTech')

    # ── 14. Badge pill ────────────────────────────────────────────────────────
    pill_w, pill_h = 164, 22
    c.setFillColor(C_YELLOW)
    c.roundRect(tx, H * 0.105, pill_w, pill_h, pill_h / 2, fill=1, stroke=0)
    c.setFillColor(C_BLACK)
    c.setFont('Helvetica-Bold', 9)
    c.drawCentredString(tx + pill_w / 2, H * 0.105 + 7, 'Guide gratuit  ·  21 pages')


# ── Build story ───────────────────────────────────────────────────────────────
def build():
    story = []
    tpl = LPTPageTemplate(skip_pages=(1, 21))

    # ───────────────────────────────────────────────────────────────────────
    # PAGE 1 — COUVERTURE (dessinée via draw_cover() sur canvas)
    # ───────────────────────────────────────────────────────────────────────
    story.append(PageBreak())

    # ───────────────────────────────────────────────────────────────────────
    # PAGE 2 — AVANT-PROPOS
    # ───────────────────────────────────────────────────────────────────────
    story.append(Paragraph('Avant-propos', s_eyebrow))
    story.append(Paragraph('Ce guide est pour toi si…', s_h1))
    story.append(HR())
    story.append(sp(6))
    story.append(Paragraph(
        "J'ai passé 16 ans dans le marketing digital avant de me reconvertir dans "
        "la tech à 38 ans. Sans réseau dans le secteur, sans diplôme informatique, "
        "avec beaucoup de questions sans réponse claire.",
        s_body))
    story.append(Paragraph(
        "Ce guide, c'est ce que j'aurais voulu avoir à l'époque. Pas une liste de "
        "métiers tendance. Pas un article de presse optimisé pour le SEO. Un vrai "
        "guide pratique, écrit par quelqu'un qui a fait le chemin.",
        s_body))
    story.append(sp(10))
    story.append(Paragraph(
        '<i>"Il est pour toi si tu envisages une reconversion dans le digital mais '
        'que tu ne sais pas par quel métier commencer. Si tu veux éviter de passer '
        '6 mois dans la mauvaise formation. Si tu cherches des réponses honnetes '
        'sur les salaires, les prerequis et les dispositifs de financement."</i>',
        s_quote))
    story.append(sp(16))

    # 3 "pour toi si" points
    points = [
        ('01', 'Tu envisages une reconversion dans le digital',
         'mais tu ne sais pas par quel métier commencer'),
        ('02', 'Tu veux éviter 6 mois dans la mauvaise formation',
         'et choisir une voie qui correspond à ce que tu es déjà'),
        ('03', 'Tu cherches des réponses honnêtes',
         'sur les salaires, les prérequis, et comment financer ta formation'),
    ]
    for num, title, sub in points:
        story.append(NumberedStep(num, title, sub))
        story.append(sp(6))

    story.append(sp(16))
    story.append(card([
        Paragraph('Comment utiliser ce guide', s_eyebrow),
        Paragraph(
            'Lis les fiches métier une par une. Quand l\'une d\'elles résonne, '
            'note-la. À la fin, tu auras 1 ou 2 directions claires. '
            'Utilise ensuite la checklist page 15 pour passer à l\'action.',
            s_body),
    ], pad=12))
    story.append(PageBreak())

    # ───────────────────────────────────────────────────────────────────────
    # PAGE 3 — SOMMAIRE
    # ───────────────────────────────────────────────────────────────────────
    story.append(Paragraph('Sommaire', s_eyebrow))
    story.append(Paragraph('Les 8 fiches métier + ressources', s_h1))
    story.append(HR())
    story.append(sp(8))

    toc_items = [
        ('05', 'Business Analyst Salesforce', 'CRM / Salesforce'),
        ('06', 'Chef de projet digital / MOA', 'Gestion de projet'),
        ('07', 'Data Analyst', 'Data & BI'),
        ('08', 'Administrateur Salesforce', 'CRM / Salesforce'),
        ('09', 'Traffic Manager / Expert SEA', 'Marketing digital'),
        ('10', 'Expert SEO', 'Marketing digital'),
        ('11', 'Consultant No-Code', 'No-code / Dev'),
        ('12', 'UX Designer', 'Design UX/UI'),
        ('13', 'Les dispositifs de financement', ''),
        ('14', 'Tableau comparatif financement', ''),
        ('15', 'La checklist reconversion (12 étapes)', ''),
        ('16', 'Les 5 erreurs à éviter', ''),
        ('17', 'Ressources gratuites pour commencer ce soir', ''),
        ('18', 'À propos de Guy et LaPasseTech', ''),
        ('19', 'Prochaines étapes', ''),
    ]

    for i, (page, title, family) in enumerate(toc_items):
        bg = C_CREAM if i % 2 == 0 else C_PAPER
        row_data = [[
            Paragraph(page, s_toc_num),
            Paragraph(f'<b>{title}</b>'
                      + (f'<br/><font color="#9A9388" size="8">{family}</font>' if family else ''),
                      s_toc_title),
        ]]
        row_t = Table(row_data, colWidths=[30, TEXT_W - 32])
        row_t.setStyle(TableStyle([
            ('BACKGROUND', (0,0),(-1,-1), bg),
            ('TOPPADDING', (0,0),(-1,-1), 6),
            ('BOTTOMPADDING', (0,0),(-1,-1), 6),
            ('LEFTPADDING', (0,0),(-1,-1), 8),
            ('RIGHTPADDING', (0,0),(-1,-1), 8),
            ('VALIGN', (0,0),(-1,-1), 'MIDDLE'),
        ]))
        story.append(row_t)

    story.append(PageBreak())

    # ───────────────────────────────────────────────────────────────────────
    # PAGE 4 — LES 5 FAMILLES
    # ───────────────────────────────────────────────────────────────────────
    story.append(Paragraph('Introduction', s_eyebrow))
    story.append(Paragraph('Les 5 familles du digital', s_h1))
    story.append(HR())
    story.append(sp(4))
    story.append(Paragraph(
        "Avant de plonger dans les fiches métier, voici l'essentiel : "
        "le digital n'est pas <i>un</i> métier, c'est un écosystème organisé "
        "en 5 grandes familles. Chacune a sa propre logique, ses propres profils "
        "et ses propres formations.",
        s_body))
    story.append(sp(10))

    families = [
        ('01', 'Business Analyst / Chef de projet',
         'Les traducteurs. Ils font le lien entre équipes métier et équipes tech.',
         C_CARAMEL),
        ('02', 'Marketing digital / CRM',
         'Les architectes de la relation client. Attirer, convertir, fidéliser.',
         C_CARAMEL),
        ('03', 'Développement web / No-code',
         'Les constructeurs. Sites, apps, automatisations — avec ou sans code.',
         C_GREEN),
        ('04', 'Data & Business Intelligence',
         "Les détectives. Transformer des données en décisions.",
         C_GREEN),
        ('05', 'Design UX/UI',
         "Les architectes de l'expérience. Concevoir des interfaces centrées humain.",
         C_CARAMEL),
    ]

    for num, name, desc, color in families:
        row_data = [[
            Paragraph(f'<font color="{color.hexval()}">{num}</font>',
                      S('FamNum', fontName='Helvetica-Bold', fontSize=16,
                        textColor=color, leading=20)),
            [Paragraph(f'<b>{name}</b>',
                       S('FamName', fontName='Helvetica-Bold', fontSize=11,
                         textColor=C_INK, leading=15, spaceAfter=2)),
             Paragraph(desc, s_small)],
        ]]
        t = Table(row_data, colWidths=[32, TEXT_W - 34])
        t.setStyle(TableStyle([
            ('BACKGROUND', (0,0),(-1,-1), C_PAPER),
            ('BOX', (0,0),(-1,-1), 0.5, C_BORDER),
            ('TOPPADDING', (0,0),(-1,-1), 10),
            ('BOTTOMPADDING', (0,0),(-1,-1), 10),
            ('LEFTPADDING', (0,0),(-1,-1), 12),
            ('RIGHTPADDING', (0,0),(-1,-1), 12),
            ('VALIGN', (0,0),(-1,-1), 'TOP'),
        ]))
        story.append(t)
        story.append(sp(4))

    story.append(sp(8))
    story.append(card([
        Paragraph('Rappel important', s_eyebrow),
        Paragraph(
            'Ces familles ne sont pas étanches. Un BA Salesforce côtoie des équipes '
            'data et marketing. Un expert CRM touche au design et à l\'analytics. '
            'Ce que tu choisis est une <b>porte d\'entrée</b>, pas un couloir permanent.',
            s_body),
    ], bg=C_CARAMEL_SOFT, border=C_CARAMEL, pad=12))
    story.append(PageBreak())

    # ───────────────────────────────────────────────────────────────────────
    # PAGES 5-12 — FICHES MÉTIER
    # ───────────────────────────────────────────────────────────────────────
    metier_page(story,
        'CRM / Salesforce', C_CARAMEL,
        'Business Analyst Salesforce',
        [('Salaire junior', '35-42 k€/an'), ('Après 3 ans', '50-65 k€/an'),
         ('Formation', '3-6 mois'), ('Financement', 'POEI ✓ CPF ✓')],
        "Faire le lien entre les équipes métier (commerciaux, marketing, service client) "
        "et la plateforme Salesforce. Animer des ateliers de recueil de besoins, "
        "rédiger des spécifications fonctionnelles, configurer la plateforme, "
        "tester les solutions et former les utilisateurs. "
        "Pas de code — mais une compréhension précise des systèmes et des processus.",
        ['Écoute active et capacité à reformuler',
         'Rigueur rédactionnelle — spécifications sans ambiguïté',
         'Logique de processus et curiosité systémique',
         'Méthodes Agile / Scrum (bases suffisent)'],
        "Marketing, gestion de projet, administration des ventes, RH, "
        "support client — tout profil avec une expérience en contact avec des outils CRM.",
        "Créer un compte Trailhead Salesforce (gratuit) → commencer le trail "
        "\"Admin Beginner\" → viser la certification Salesforce Administrator (~200€)")

    metier_page(story,
        'Gestion de projet', C_CARAMEL,
        'Chef de projet digital / MOA',
        [('Salaire junior', '34-42 k€/an'), ('Après 3 ans', '48-60 k€/an'),
         ('Formation', '3-9 mois'), ('Financement', 'CPF ✓ Transitions Pro ✓')],
        "Piloter les projets digitaux de A à Z : recueillir les besoins, rédiger les "
        "cahiers des charges, coordonner les équipes techniques et métier, "
        "garantir les délais et la qualité des livrables. "
        "Travailler en méthode Agile avec des cycles courts et des ajustements réguliers.",
        ['Gestion des parties prenantes et communication multi-équipes',
         'Maîtrise des méthodes Agile, Scrum, Kanban',
         'Capacité à prioriser sous contrainte de délais',
         'Rédaction de spécifications et de plans de projet'],
        "Chef de projet dans tous les secteurs, coordinateur, responsable planning, "
        "gestionnaire de programme — tout profil habitué à piloter des projets "
        "avec plusieurs interlocuteurs.",
        "Certifications PSM I (Professional Scrum Master) ou CAPM — accessibles "
        "via le CPF en 2-3 mois, très reconnues par les recruteurs.")

    metier_page(story,
        'Data & BI', C_GREEN,
        'Data Analyst',
        [('Salaire junior', '33-40 k€/an'), ('Après 3 ans', '45-55 k€/an'),
         ('Formation', '4-8 mois'), ('Financement', 'CPF ✓ POEI ✓ Bootcamp')],
        "Transformer des données brutes en informations utiles pour les équipes. "
        "Extraire des données via SQL, les nettoyer, créer des tableaux de bord "
        "visuels sur Power BI ou Tableau, identifier les tendances et "
        "présenter les insights aux décideurs. "
        "30 à 40 % du métier : nettoyage et structuration des données.",
        ['Excel / Google Sheets niveau intermédiaire (TCD, formules)',
         'SQL — bases suffisantes pour un premier poste',
         'Power BI ou Tableau — création de dashboards',
         'Pédagogie pour expliquer les chiffres aux équipes non-tech'],
        "Finance, comptabilité, contrôle de gestion, marketing, e-commerce, RH "
        "— tout profil à l'aise avec les chiffres et les tableaux.",
        "Google Data Analytics Certificate sur Coursera (~45€/mois, 3-6 mois) "
        "— certification reconnue et finançable CPF. Ou bootcamp Jedha / DataScientest.")

    metier_page(story,
        'CRM / Salesforce', C_CARAMEL,
        'Administrateur Salesforce',
        [('Salaire junior', '35-40 k€/an'), ('Après 3 ans', '50-60 k€/an'),
         ('Formation', '2-4 mois'), ('Financement', 'CPF ✓ POEI ✓')],
        "Configurer et maintenir la plateforme Salesforce pour les utilisateurs internes. "
        "Créer des champs, des automatisations (Flows), des rapports, "
        "gérer les accès utilisateurs et répondre aux demandes d'évolution. "
        "C'est le point d'entrée le plus court vers l'écosystème Salesforce.",
        ['Logique de configuration — comprendre comment les objets s\'organisent',
         'Rigueur et sens du service interne',
         'Curiosité pour les outils et les automatisations',
         'Pas de code requis — outils visuels exclusivement'],
        "Administration des ventes, support client, assistants de direction, "
        "secrétaires, tout profil avec une appétence pour les outils informatiques.",
        "Trailhead Salesforce gratuit (trailhead.salesforce.com) "
        "→ trail \"Admin Beginner\" → certification Salesforce Administrator (~200€)")

    metier_page(story,
        'Marketing digital', C_CARAMEL,
        'Traffic Manager / Expert SEA',
        [('Salaire junior', '28-36 k€/an'), ('Après 3 ans', '42-55 k€/an'),
         ('Formation', '2-4 mois'), ('Financement', 'CPF ✓')],
        "Gérer les campagnes publicitaires payantes sur Google Ads, Meta Ads "
        "(Facebook / Instagram) et TikTok Ads. "
        "Créer les campagnes, définir les audiences, analyser les performances "
        "(CTR, CPA, ROAS) et optimiser les budgets en continu.",
        ['Analyse de données et lecture de tableaux de bord',
         'Créativité pour les textes et visuels publicitaires',
         'Gestion budgétaire et sens des priorités',
         'Curiosité pour les plateformes et leurs évolutions constantes'],
        "Profils commerciaux, communication, vente, gestion — "
        "tout profil à l'aise avec les chiffres et les objectifs de performance.",
        "Certifications Google Ads sur Skillshop (skillshop.withgoogle.com) "
        "— gratuites, reconnues, accessibles en 2-3 semaines.")

    metier_page(story,
        'Marketing digital', C_CARAMEL,
        'Expert SEO',
        [('Salaire junior', '28-35 k€/an'), ('Après 3 ans', '40-52 k€/an'),
         ('Formation', '3-6 mois'), ('Financement', 'CPF ✓')],
        "Optimiser la visibilité d'un site web dans les résultats de Google "
        "sans publicité payante. Trois axes : contenu (articles optimisés), "
        "technique (vitesse, structure), et popularité (liens entrants). "
        "Les effets se mesurent sur plusieurs mois.",
        ['Rédaction claire et logique de structuration de l\'information',
         'Logique analytique pour interpréter Google Search Console',
         'Curiosité technique — comprendre comment fonctionnent les sites',
         'Patience — le SEO est un investissement long terme'],
        "Journalistes, enseignants, communicants, rédacteurs, "
        "tout profil avec une aisance à l'écrit et un goût pour l'analyse.",
        "HubSpot SEO Certification (academy.hubspot.com, gratuit) "
        "+ créer un blog personnel et installer Google Search Console dès ce soir.")

    metier_page(story,
        'No-code / Dev', C_GREEN,
        'Consultant No-Code',
        [('TJM indépendant', '400-800€/jour'), ('Salarié', '32-42 k€/an'),
         ('Formation', '1-3 mois'), ('Financement', 'CPF ✓')],
        "Construire des produits digitaux sans écrire de code, via des outils visuels : "
        "sites web avec Webflow, applications avec Bubble, "
        "automatisations avec Make ou n8n, bases de données avec Notion ou Airtable. "
        "De nombreux indépendants facturent leurs missions directement.",
        ['Logique de processus — penser en \"si... alors...\"',
         'Créativité produit et sens de l\'expérience utilisateur',
         'Autonomie et capacité à apprendre en autodidacte',
         'Communication claire avec les clients non-techniques'],
        "Tous profils avec une appétence technologique — "
        "pas besoin de parcours technique préalable. "
        "La curiosité et la débrouillardise comptent plus que le diplôme.",
        "Make.com gratuit — construire un premier scénario d'automatisation. "
        "Webflow University (university.webflow.com) — gratuit, en anglais.")

    metier_page(story,
        'Design UX/UI', C_CARAMEL,
        'UX Designer',
        [('Salaire junior', '32-40 k€/an'), ('Après 3 ans', '45-58 k€/an'),
         ('Formation', '3-6 mois'), ('Financement', 'CPF ✓ POEI ✓')],
        "Concevoir des interfaces digitales centrées sur l'utilisateur : "
        "recherche utilisateur (entretiens, observations), "
        "wireframes et maquettes dans Figma, "
        "tests d'utilisabilité et itérations. "
        "Le design UX n'est pas un métier artistique — c'est un métier analytique.",
        ['Empathie — comprendre les vrais besoins des utilisateurs',
         'Logique analytique pour structurer les parcours',
         'Maîtrise de Figma (gratuit en version individuelle)',
         'Capacité à synthétiser et à présenter des recommandations'],
        "RH, travail social, enseignants, profils santé, "
        "tout profil dont le métier consistait à comprendre les gens "
        "pour leur rendre service.",
        "Figma Learn (figma.com/resources/learn-design, gratuit) "
        "+ Google UX Design Certificate sur Coursera (6 mois, ~40€/mois).")

    # ───────────────────────────────────────────────────────────────────────
    # PAGE 13 — DISPOSITIFS DE FINANCEMENT
    # ───────────────────────────────────────────────────────────────────────
    story.append(Paragraph('Financement', s_eyebrow))
    story.append(Paragraph('Les dispositifs pour financer ta formation', s_h1))
    story.append(HR())
    story.append(sp(6))
    story.append(Paragraph(
        "Bonne nouvelle : en France, une reconversion professionnelle peut être "
        "financée à 100 %. Le bon dispositif dépend de ta situation actuelle.",
        s_body))
    story.append(sp(10))

    financement_cards = [
        ('CPF', 'Pour tout le monde',
         "Jusqu'à 5 000€. Géré sur moncompteformation.gouv.fr. "
         "Reste à charge de 100€ depuis 2024. "
         "Idéal pour des formations courtes et ciblées.",
         C_CARAMEL_SOFT, C_CARAMEL),
        ('POEI', 'Pour les demandeurs d\'emploi',
         "100 % financé par France Travail. Emploi garanti à la sortie. "
         "Formation de 3 à 6 mois. "
         "Le dispositif le plus puissant — peu connu, très efficace.",
         HexColor('#D4F5E9'), C_GREEN),
        ('Transitions Pro', 'Pour les salariés CDI',
         "Formation longue jusqu'à 1 an. Salaire maintenu (partiel ou total). "
         "2 ans d'ancienneté requis. "
         "Idéal pour une reconversion complète sans démissionner.",
         HexColor('#E8E4FF'), HexColor('#5B4FCF')),
    ]

    for abbrev, who, desc, bg, accent_c in financement_cards:
        row_data = [[
            Paragraph(f'<font color="{accent_c.hexval()}"><b>{abbrev}</b></font>',
                      S('FCard', fontName='Helvetica-Bold', fontSize=20,
                        textColor=accent_c, leading=24)),
            [Paragraph(who,
                       S('FWho', fontName='Helvetica-Bold', fontSize=10,
                         textColor=C_INK, leading=14, spaceAfter=3)),
             Paragraph(desc, s_small)],
        ]]
        t = Table(row_data, colWidths=[52, TEXT_W - 54])
        t.setStyle(TableStyle([
            ('BACKGROUND', (0,0),(-1,-1), bg),
            ('BOX', (0,0),(-1,-1), 0.75, accent_c),
            ('TOPPADDING', (0,0),(-1,-1), 12),
            ('BOTTOMPADDING', (0,0),(-1,-1), 12),
            ('LEFTPADDING', (0,0),(-1,-1), 14),
            ('RIGHTPADDING', (0,0),(-1,-1), 14),
            ('VALIGN', (0,0),(-1,-1), 'TOP'),
        ]))
        story.append(t)
        story.append(sp(6))

    story.append(sp(6))
    story.append(card([
        Paragraph('Tu peux combiner les dispositifs', s_eyebrow),
        Paragraph(
            'CPF + Transitions Pro, CPF + POEI, CPF + financement employeur — '
            'les dispositifs se cumulent. Consulte un CEP (Conseil en Évolution '
            'Professionnelle) gratuitement pour montage de dossier.',
            s_body),
    ], bg=C_CARAMEL_SOFT, border=C_CARAMEL, pad=10))
    story.append(PageBreak())

    # ───────────────────────────────────────────────────────────────────────
    # PAGE 14 — TABLEAU COMPARATIF
    # ───────────────────────────────────────────────────────────────────────
    story.append(Paragraph('Comparatif', s_eyebrow))
    story.append(Paragraph('Quel dispositif selon ta situation ?', s_h1))
    story.append(HR())
    story.append(sp(8))

    col_labels = ['Dispositif', 'Pour qui', 'Montant', 'Durée max', 'Point fort', 'Limite']
    table_data = [
        col_labels,
        ['CPF', 'Tous', 'Jusqu\'à 5 000€', '12 mois', 'Liberté totale', 'Reste à charge 100€'],
        ['POEI', 'Dem. emploi', '100% gratuit', '400 h', 'Emploi garanti', 'Trouver l\'offre'],
        ['Transitions\nPro', 'CDI 2 ans+', 'Salaire + formation', '12 mois', 'Salaire maintenu', 'Dossier lourd'],
        ['AIF\n(FT)', 'Dem. emploi', 'Variable', '12 mois', 'Flexible', 'Selon conseiller'],
    ]

    col_widths_t = [
        TEXT_W * 0.13, TEXT_W * 0.14, TEXT_W * 0.16,
        TEXT_W * 0.14, TEXT_W * 0.23, TEXT_W * 0.20
    ]
    t = Table(table_data, colWidths=col_widths_t, repeatRows=1)
    t.setStyle(TableStyle([
        # Header
        ('BACKGROUND', (0,0), (-1,0), C_BLACK),
        ('TEXTCOLOR', (0,0), (-1,0), C_CREAM),
        ('FONTNAME', (0,0), (-1,0), 'Helvetica-Bold'),
        ('FONTSIZE', (0,0), (-1,0), 8.5),
        ('BOTTOMPADDING', (0,0), (-1,0), 8),
        ('TOPPADDING', (0,0), (-1,0), 8),
        # Rows
        ('BACKGROUND', (0,1), (-1,1), C_CREAM),
        ('BACKGROUND', (0,2), (-1,2), C_PAPER),
        ('BACKGROUND', (0,3), (-1,3), C_CREAM),
        ('BACKGROUND', (0,4), (-1,4), C_PAPER),
        ('FONTNAME', (0,1), (0,-1), 'Helvetica-Bold'),
        ('FONTSIZE', (0,1), (-1,-1), 8.5),
        ('TEXTCOLOR', (0,1), (-1,-1), C_GRAY),
        ('TEXTCOLOR', (0,1), (0,-1), C_CARAMEL),
        ('TOPPADDING', (0,1), (-1,-1), 7),
        ('BOTTOMPADDING', (0,1), (-1,-1), 7),
        ('LEFTPADDING', (0,0), (-1,-1), 8),
        ('RIGHTPADDING', (0,0), (-1,-1), 6),
        ('GRID', (0,0), (-1,-1), 0.4, C_BORDER),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
    ]))
    story.append(t)
    story.append(sp(16))

    story.append(Paragraph('Comment choisir en 30 secondes', s_h2))
    choosing = [
        ('Tu es en emploi et tu veux te former vite', 'CPF'),
        ('Tu es demandeur d\'emploi et tu veux un job garanti', 'POEI en priorité'),
        ('Tu es salarié CDI et tu veux changer de métier', 'Transitions Pro'),
        ('Tu veux combiner plusieurs sources', 'CPF + POEI ou CPF + Transitions Pro'),
    ]
    for situation, device in choosing:
        row_data = [[
            Paragraph(situation, s_body),
            Paragraph(f'<b>{device}</b>',
                      S('DevC', fontName='Helvetica-Bold', fontSize=10.5,
                        textColor=C_CARAMEL, leading=14)),
        ]]
        row_t = Table(row_data, colWidths=[TEXT_W * 0.65, TEXT_W * 0.35])
        row_t.setStyle(TableStyle([
            ('TOPPADDING', (0,0),(-1,-1), 6),
            ('BOTTOMPADDING', (0,0),(-1,-1), 6),
            ('LEFTPADDING', (0,0),(-1,-1), 0),
            ('RIGHTPADDING', (0,0),(-1,-1), 0),
            ('LINEBELOW', (0,0),(-1,0), 0.5, C_BORDER),
            ('VALIGN', (0,0),(-1,-1), 'MIDDLE'),
        ]))
        story.append(row_t)
    story.append(PageBreak())

    # ───────────────────────────────────────────────────────────────────────
    # PAGE 15 — CHECKLIST
    # ───────────────────────────────────────────────────────────────────────
    story.append(Paragraph('Action', s_eyebrow))
    story.append(Paragraph('La checklist reconversion — 12 étapes', s_h1))
    story.append(HR())
    story.append(sp(6))
    story.append(Paragraph(
        "Ces étapes sont dans l'ordre. Ne saute pas à l'étape 6 "
        "sans avoir fait les 5 premières.",
        s_body))
    story.append(sp(10))

    checklist = [
        ('Faire le bilan de tes compétences transférables',
         'Qu\'est-ce que tu faisais vraiment dans ton ancien boulot ?'),
        ('Identifier ta famille de métier',
         'Ce guide t\'aide à le faire — quelle fiche t\'a le plus parlé ?'),
        ('Vérifier ton solde CPF',
         'Sur moncompteformation.gouv.fr — 5 minutes, c\'est fait'),
        ('Tester le métier visé 30 minutes',
         'Trailhead, Figma Learn, Make.com — avant d\'investir du temps et de l\'argent'),
        ('Rencontrer 2-3 professionnels du métier visé',
         'LinkedIn fonctionne — un message honnête, une demande de 20 minutes'),
        ('Choisir le bon dispositif de financement',
         'CPF, POEI, Transitions Pro — selon ta situation'),
        ('Sélectionner une formation certifiante',
         'Logo RNCP ou RS obligatoire pour les financements publics'),
        ('Monter le dossier de financement',
         'CEP gratuit pour t\'accompagner si besoin'),
        ('Démarrer la formation',
         'L\'engagement est la compétence la plus rare'),
        ('Construire portfolio et certifications',
         'Pendant la formation, pas après'),
        ('Activer ton réseau LinkedIn',
         'Partager ta progression — la communauté suit les gens qui avancent'),
        ('Postuler avec ton expérience comme atout',
         'Pas comme excuse — comme différenciateur'),
    ]

    for i, (title, sub) in enumerate(checklist):
        story.append(NumberedStep(i + 1, title, sub))
        story.append(sp(5))

    story.append(PageBreak())

    # ───────────────────────────────────────────────────────────────────────
    # PAGE 16 — ERREURS À ÉVITER
    # ───────────────────────────────────────────────────────────────────────
    story.append(Paragraph('Attention', s_eyebrow))
    story.append(Paragraph('Les 5 erreurs qui coûtent des mois', s_h1))
    story.append(HR())
    story.append(sp(6))
    story.append(Paragraph(
        "Ces erreurs sont commises par la majorité des reconvertis. "
        "Les connaître à l'avance te fait économiser plusieurs mois.",
        s_body))
    story.append(sp(10))

    errors = [
        ('Choisir le métier le mieux payé',
         "Sans vérifier l'adéquation avec son profil. Le salaire suit la maîtrise — "
         "et la maîtrise ne vient que si le métier te correspond vraiment."),
        ('Attendre d\'être "prêt"',
         "On ne l'est jamais assez selon ses propres critères. "
         "Le seuil suffisant pour commencer est beaucoup plus bas que tu ne le penses."),
        ('S\'inscrire dans une formation non certifiante',
         "Le CPF ne finance que les formations avec certification RNCP ou RS. "
         "Vérifier ce point avant de signer quoi que ce soit."),
        ('S\'excuser de son ancienne expérience',
         "C'est ton avantage compétitif sur les profils juniors sortis d'école. "
         "Ton expérience métier vaut cher — arrête de t'en excuser en entretien."),
        ('Vouloir tout faire seul',
         "La communauté et le réseau sont déterminants. "
         "Les reconvertis qui réussissent le plus vite sont ceux qui se montrent, "
         "qui posent des questions, qui s'entraident."),
    ]

    for i, (title, desc) in enumerate(errors):
        row_data = [[
            Paragraph(f'0{i+1}',
                      S('ErrNum', fontName='Helvetica-Bold', fontSize=22,
                        textColor=C_CARAMEL_SOFT, leading=24)),
            [Paragraph(title, s_error_title),
             Paragraph(desc, s_body)],
        ]]
        t = Table(row_data, colWidths=[44, TEXT_W - 46])
        t.setStyle(TableStyle([
            ('BACKGROUND', (0,0),(-1,-1), C_CREAM if i % 2 == 0 else C_PAPER),
            ('BOX', (0,0),(-1,-1), 0.5, C_BORDER),
            ('TOPPADDING', (0,0),(-1,-1), 12),
            ('BOTTOMPADDING', (0,0),(-1,-1), 12),
            ('LEFTPADDING', (0,0),(-1,-1), 14),
            ('RIGHTPADDING', (0,0),(-1,-1), 14),
            ('VALIGN', (0,0),(-1,-1), 'TOP'),
        ]))
        story.append(t)
        story.append(sp(5))

    story.append(PageBreak())

    # ───────────────────────────────────────────────────────────────────────
    # PAGE 17 — RESSOURCES GRATUITES
    # ───────────────────────────────────────────────────────────────────────
    story.append(Paragraph('Ressources', s_eyebrow))
    story.append(Paragraph('Pour commencer ce soir — 100 % gratuit', s_h1))
    story.append(HR())
    story.append(sp(6))
    story.append(Paragraph(
        "Avant d'investir dans une formation payante, teste avec ces ressources. "
        "30 minutes de pratique réelle vaut mieux que 3 mois de doutes.",
        s_body))
    story.append(sp(10))

    resources = [
        ('Salesforce / BA', C_CARAMEL, [
            'Trailhead — trailhead.salesforce.com (trail "Admin Beginner")',
            'Salesforce Ben Blog — ressources et guides certifications',
        ]),
        ('Data', C_GREEN, [
            'Google Data Analytics — coursera.org/professional-certificates/google-data-analytics',
            'Mode Analytics — tutoriels SQL gratuits',
            'Power BI gratuit — microsoft.com/fr-fr/power-platform/products/power-bi',
        ]),
        ('Marketing digital', C_CARAMEL, [
            'Skillshop Google — skillshop.withgoogle.com (Google Ads, Analytics)',
            'HubSpot Academy — academy.hubspot.com (SEO, Content, Email)',
        ]),
        ('No-code', C_GREEN, [
            'Make.com — make.com (compte gratuit, premiers scénarios)',
            'Webflow University — university.webflow.com',
            'Bubble Academy — bubble.io/academy',
        ]),
        ('Design UX/UI', C_CARAMEL, [
            'Figma Learn — figma.com/resources/learn-design',
            'Google UX Design Certificate — coursera.org (~40€/mois)',
        ]),
        ('Général / Dev', C_GREEN, [
            'The Odin Project — theodinproject.com (code, gratuit)',
            'freeCodeCamp — freecodecamp.org (code, gratuit)',
            'OpenClassrooms — openclassrooms.com (offre gratuite étendue)',
        ]),
    ]

    for family, color, items in resources:
        fam_para = Paragraph(family,
                              S('ResFam', fontName='Helvetica-Bold', fontSize=10,
                                textColor=color, leading=14, spaceAfter=4))
        items_content = [fam_para]
        for item in items:
            items_content.append(
                Paragraph(f'— {item}', s_resource_item))
        story.append(card(items_content, bg=C_PAPER, border=C_BORDER, pad=10))
        story.append(sp(5))

    story.append(PageBreak())

    # ───────────────────────────────────────────────────────────────────────
    # PAGE 18 — À PROPOS DE GUY
    # ───────────────────────────────────────────────────────────────────────
    story.append(Paragraph('À propos', s_eyebrow))
    story.append(Paragraph('Guy Gambo — le parcours derrière ce guide', s_h1))
    story.append(HR())
    story.append(sp(8))

    # Photo placeholder card
    photo_inner = Table([
        [Paragraph('Guy', S('PhotoEmoji', fontName='Helvetica-Bold',
                             fontSize=22, textColor=C_GRAY_LT,
                             leading=28, alignment=TA_CENTER))],
        [Paragraph('Gambo', S('PhotoSub', fontName='Helvetica', fontSize=8,
                               textColor=C_GRAY_LIGHT, leading=11, alignment=TA_CENTER))],
    ], colWidths=[80])
    photo_inner.setStyle(TableStyle([
        ('TOPPADDING', (0,0),(-1,-1), 8),
        ('BOTTOMPADDING', (0,0),(-1,-1), 4),
        ('LEFTPADDING', (0,0),(-1,-1), 0),
        ('RIGHTPADDING', (0,0),(-1,-1), 0),
        ('VALIGN', (0,0),(-1,-1), 'MIDDLE'),
    ]))
    photo_row = [[
        photo_inner,
        [
            Paragraph('Guy Gambo', s_body_strong),
            Paragraph('Fondateur, LaPasseTech', s_small),
            sp(4),
            Paragraph('Business Analyst Salesforce', s_small),
            Paragraph('Business Analyst  ·  Reconverti a 38 ans', s_small),
        ],
    ]]
    intro_t = Table(photo_row, colWidths=[90, TEXT_W - 92])
    intro_t.setStyle(TableStyle([
        ('BACKGROUND', (0,0),(-1,-1), C_CREAM),
        ('BOX', (0,0),(-1,-1), 0.75, C_BORDER),
        ('TOPPADDING', (0,0),(-1,-1), 14),
        ('BOTTOMPADDING', (0,0),(-1,-1), 14),
        ('LEFTPADDING', (0,0),(-1,-1), 14),
        ('RIGHTPADDING', (0,0),(-1,-1), 14),
        ('VALIGN', (0,0),(-1,-1), 'TOP'),
    ]))
    story.append(intro_t)
    story.append(sp(14))

    story.append(Paragraph(
        "Je suis Guy Gambo. Après 16 ans comme Responsable Marketing Digital et CRM "
        "dans des groupes de presse parisiens, j'ai décidé de tout changer à 38 ans.",
        s_about_body))
    story.append(Paragraph(
        "J'ai découvert le métier de Business Analyst Salesforce par accident, "
        "en travaillant avec des consultants dans mon dernier poste. "
        "J'ai utilisé la POEI pour me former en 3 mois, décroché la certification "
        "Salesforce Administrator, et trouvé mon premier poste dans la tech.",
        s_about_body))
    story.append(Paragraph(
        "LaPasseTech, c'est ce que j'aurais voulu avoir à l'époque : "
        "un guide honnête, sans jargon, sans promesses impossibles. "
        "Un raccourci pour ceux qui veulent changer sans se perdre.",
        s_about_body))
    story.append(sp(16))

    story.append(card([
        Paragraph('LaPasseTech en quelques chiffres', s_eyebrow),
        Table([[
            [Paragraph('16', s_metric_val), Paragraph('ans en marketing', s_metric_label)],
            [Paragraph('40', s_metric_val), Paragraph('ans lors de la reconversion', s_metric_label)],
            [Paragraph('3', s_metric_val), Paragraph('mois de formation POEI', s_metric_label)],
            [Paragraph('1', s_metric_val), Paragraph('certification Salesforce Admin', s_metric_label)],
        ]], colWidths=[TEXT_W/4 - 14]*4),
    ], bg=C_CREAM, pad=12))
    story.append(PageBreak())

    # ───────────────────────────────────────────────────────────────────────
    # PAGE 19 — PROCHAINES ÉTAPES / CTA
    # ───────────────────────────────────────────────────────────────────────
    story.append(Paragraph('Et maintenant ?', s_eyebrow))
    story.append(Paragraph('Tes prochaines étapes concrètes', s_h1))
    story.append(HR())
    story.append(sp(6))
    story.append(Paragraph(
        "Tu sais maintenant quel métier explorer. "
        "Voici les 4 actions à faire dans les prochaines 48 heures.",
        s_body))
    story.append(sp(14))

    ctas = [
        ('01', 'Faire mon bilan gratuit',
         '10 questions pour confirmer ta direction et tes compétences transférables.',
         'lapassetech.fr/bilan'),
        ('02', 'Explorer les ressources',
         'Pas-à-pas concrets classés par thème — à appliquer ce soir.',
         'lapassetech.fr/ressources'),
        ('03', 'Lire les articles',
         'Reconversion, financement, métiers — par quelqu\'un qui a fait le chemin.',
         'lapassetech.fr/articles'),
        ('04', 'S\'abonner à la newsletter',
         '2 fois par semaine, un article et une ressource actionnable. Sans spam.',
         'lapassetech.fr'),
    ]

    for num, title, desc, url in ctas:
        row_data = [[
            Paragraph(f'<font color="{C_CARAMEL.hexval()}">{num}</font>',
                      S('CTANum', fontName='Helvetica-Bold', fontSize=18,
                        textColor=C_CARAMEL, leading=22)),
            [Paragraph(title, s_body_strong),
             Paragraph(desc, s_body),
             Paragraph(url,
                       S('CTAURL', fontName='Helvetica-Bold', fontSize=9,
                         textColor=C_CARAMEL, leading=13))],
        ]]
        t = Table(row_data, colWidths=[36, TEXT_W - 38])
        t.setStyle(TableStyle([
            ('BACKGROUND', (0,0),(-1,-1), C_CREAM),
            ('BOX', (0,0),(-1,-1), 0.75, C_BORDER),
            ('TOPPADDING', (0,0),(-1,-1), 12),
            ('BOTTOMPADDING', (0,0),(-1,-1), 12),
            ('LEFTPADDING', (0,0),(-1,-1), 14),
            ('RIGHTPADDING', (0,0),(-1,-1), 14),
            ('VALIGN', (0,0),(-1,-1), 'TOP'),
        ]))
        story.append(t)
        story.append(sp(6))

    story.append(sp(10))
    final_card = dark_card([
        Paragraph('<font color="#FAF8F5"><b>LaPasseTech</b></font>',
                  S('FC1', fontName='Helvetica-Bold', fontSize=18,
                    textColor=C_CREAM, leading=22, alignment=TA_CENTER,
                    spaceAfter=6)),
        Paragraph('<font color="#F2E2CC">Reconversion vers les métiers du digital.</font>',
                  S('FC2', fontName='Helvetica-Oblique', fontSize=11,
                    textColor=C_CARAMEL_SOFT, leading=16, alignment=TA_CENTER,
                    spaceAfter=3)),
        Paragraph('<font color="#F2E2CC">Sans bullshit, sans jargon, sans complexe.</font>',
                  S('FC3', fontName='Helvetica-Oblique', fontSize=11,
                    textColor=C_CARAMEL_SOFT, leading=16, alignment=TA_CENTER)),
    ], bg=C_CARAMEL, radius=10)
    story.append(final_card)
    story.append(PageBreak())

    # ───────────────────────────────────────────────────────────────────────
    # PAGE 20 — 4e DE COUVERTURE
    # ───────────────────────────────────────────────────────────────────────
    story.append(dark_card([
        Paragraph('<font color="#FAF8F5"><b>LaPasseTech</b></font>',
                  S('Back1', fontName='Helvetica-Bold', fontSize=26,
                    textColor=C_CREAM, leading=30, alignment=TA_CENTER,
                    spaceAfter=16)),
        HRFlowable(width='80%', thickness=0.5, color=HexColor('#7A4420'),
                   spaceAfter=16, spaceBefore=0),
        Paragraph('<font color="#F2E2CC"><i>Reconversion vers les métiers du digital.</i></font>',
                  S('Back2', fontName='Helvetica-Oblique', fontSize=14,
                    textColor=C_CARAMEL_SOFT, leading=20, alignment=TA_CENTER,
                    spaceAfter=4)),
        Paragraph('<font color="#F2E2CC"><i>Sans bullshit, sans jargon, sans complexe.</i></font>',
                  S('Back3', fontName='Helvetica-Oblique', fontSize=14,
                    textColor=C_CARAMEL_SOFT, leading=20, alignment=TA_CENTER,
                    spaceAfter=32)),
        HRFlowable(width='80%', thickness=0.5, color=HexColor('#7A4420'),
                   spaceAfter=16, spaceBefore=0),
        Paragraph('<font color="#FAF8F5"><b>lapassetech.fr</b></font>',
                  S('BackURL', fontName='Helvetica-Bold', fontSize=13,
                    textColor=C_CREAM, leading=18, alignment=TA_CENTER,
                    spaceAfter=6)),
        Paragraph('<font color="#F2E2CC">contact@lapassetech.fr</font>',
                  S('BackEmail', fontName='Helvetica', fontSize=11,
                    textColor=C_CARAMEL_SOFT, leading=16, alignment=TA_CENTER,
                    spaceAfter=24)),
        Paragraph('<font color="#D4A882">© 2026 LaPasseTech — Guide gratuit, diffusion libre</font>',
                  S('BackCopy', fontName='Helvetica', fontSize=9,
                    textColor=HexColor('#D4A882'), leading=13, alignment=TA_CENTER)),
    ], bg=C_CARAMEL, radius=0))

    # ── Build PDF ─────────────────────────────────────────────────────────
    doc = SimpleDocTemplate(
        OUTPUT_PATH,
        pagesize=A4,
        leftMargin=MARGIN_H,
        rightMargin=MARGIN_H,
        topMargin=MARGIN_V,
        bottomMargin=22 * mm,
        title='Les 8 métiers du digital accessibles sans coder — LaPasseTech',
        author='Guy Gambo — LaPasseTech',
        subject='Guide reconversion digitale',
    )

    def on_first_page(canv, doc):
        draw_cover(canv)
        # No footer on cover

    doc.build(story,
              onFirstPage=on_first_page,
              onLaterPages=tpl.on_page)

    print(f'PDF généré : {OUTPUT_PATH}')
    print(f'Taille : {os.path.getsize(OUTPUT_PATH) / 1024:.0f} Ko')

if __name__ == '__main__':
    build()
