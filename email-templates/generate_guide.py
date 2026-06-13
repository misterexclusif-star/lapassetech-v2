"""
Génère le guide PDF LaPasseTech V2
"Rentrer dans le digital sans le réseau, sans la grande école."
Design system V2 — contenu basé sur le guide V1 (14 pages)
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

# ── Design tokens ─────────────────────────────────────────────────────────────
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
C_RED_SOFT      = HexColor('#FDE8E8')
C_RED           = HexColor('#D93025')

W, H = A4  # 595.28 x 841.89 pt
MARGIN_H = 14 * mm
MARGIN_V = 14 * mm
TEXT_W = W - 2 * MARGIN_H

OUTPUT_PATH = os.path.join(os.path.dirname(__file__), "../public/guide-lapassetech.pdf")
os.makedirs(os.path.dirname(OUTPUT_PATH), exist_ok=True)

# ── Styles de paragraphe ──────────────────────────────────────────────────────
def S(name, **kw):
    return ParagraphStyle(name, **kw)

s_eyebrow = S('Eyebrow',
    fontName='Helvetica-Bold', fontSize=9, leading=14,
    textColor=C_CARAMEL, spaceAfter=6, spaceBefore=4)
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
s_body_cream = S('BodyCream',
    fontName='Helvetica', fontSize=10.5, leading=16,
    textColor=C_CREAM, spaceAfter=6)
s_small = S('Small',
    fontName='Helvetica', fontSize=9, leading=13,
    textColor=C_GRAY_LT, spaceAfter=4)
s_small_strong = S('SmallStrong',
    fontName='Helvetica-Bold', fontSize=9, leading=13,
    textColor=C_INK, spaceAfter=4)
s_metric_val = S('MetricVal',
    fontName='Helvetica-Bold', fontSize=13, leading=16,
    textColor=C_INK, spaceAfter=2)
s_metric_label = S('MetricLabel',
    fontName='Helvetica', fontSize=8.5, leading=12,
    textColor=C_GRAY_LT, spaceAfter=0)
s_quote = S('Quote',
    fontName='Helvetica-Oblique', fontSize=12, leading=19,
    textColor=C_CARAMEL, spaceAfter=8, spaceBefore=6, leftIndent=12)
s_quote_cream = S('QuoteCream',
    fontName='Helvetica-Oblique', fontSize=11, leading=17,
    textColor=C_CARAMEL_SOFT, spaceAfter=6, leftIndent=8)
s_center = S('Center',
    fontName='Helvetica', fontSize=10.5, leading=16,
    textColor=C_GRAY, alignment=TA_CENTER, spaceAfter=8)
s_tag = S('Tag',
    fontName='Helvetica-Bold', fontSize=8, leading=11,
    textColor=C_CARAMEL, spaceAfter=0)
s_tag_green = S('TagGreen',
    fontName='Helvetica-Bold', fontSize=8, leading=11,
    textColor=C_GREEN, spaceAfter=0)
s_back_url = S('BackUrl',
    fontName='Helvetica-Bold', fontSize=13, leading=18,
    textColor=C_CREAM, alignment=TA_CENTER, spaceAfter=4)
s_back_tagline = S('BackTagline',
    fontName='Helvetica-Oblique', fontSize=13, leading=19,
    textColor=C_CARAMEL_SOFT, alignment=TA_CENTER, spaceAfter=0)

# ── Custom Flowables ──────────────────────────────────────────────────────────
class HR(HRFlowable):
    def __init__(self, color=C_BORDER, thickness=0.75, spaceAfter=8, spaceBefore=8):
        super().__init__(width='100%', thickness=thickness,
                         color=color, spaceAfter=spaceAfter, spaceBefore=spaceBefore)

class ColorRect(Flowable):
    def __init__(self, height, color, radius=0, width=None):
        super().__init__()
        self._h = height; self._color = color
        self._r = radius; self._w = width
    def wrap(self, availW, availH):
        self.width = self._w or availW; self.height = self._h
        return self.width, self.height
    def draw(self):
        self.canv.setFillColor(self._color)
        if self._r:
            self.canv.roundRect(0, 0, self.width, self._h, self._r, fill=1, stroke=0)
        else:
            self.canv.rect(0, 0, self.width, self._h, fill=1, stroke=0)

class BadgePill(Flowable):
    def __init__(self, text, bg_color=C_CARAMEL, fg_color=C_PAPER, font_size=8):
        super().__init__()
        self._text = text; self._bg = bg_color
        self._fg = fg_color; self._fs = font_size
        self._pad_h = 10; self._pad_v = 4
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
    def __init__(self, metrics):
        super().__init__(); self._metrics = metrics
    def wrap(self, availW, availH):
        self.width = availW; self.height = 44
        return self.width, self.height
    def draw(self):
        c = self.canv; n = len(self._metrics); col_w = self.width / n
        for i, (label, value) in enumerate(self._metrics):
            x = i * col_w
            if i > 0:
                c.setStrokeColor(C_BORDER); c.setLineWidth(0.5)
                c.line(x, 4, x, self.height - 4)
            c.setFillColor(C_INK); c.setFont('Helvetica-Bold', 12)
            c.drawString(x + 8, 24, value)
            c.setFillColor(C_GRAY_LT); c.setFont('Helvetica', 8)
            c.drawString(x + 8, 10, label)

class SectionTag(Flowable):
    def __init__(self, text, color=C_CARAMEL):
        super().__init__(); self._text = text; self._color = color
    def wrap(self, availW, availH):
        self.width = availW; self.height = 20
        return self.width, self.height
    def draw(self):
        c = self.canv
        c.setFillColor(self._color); c.rect(0, 2, 3, 14, fill=1, stroke=0)
        c.setFillColor(self._color); c.setFont('Helvetica-Bold', 8.5)
        c.drawString(10, 6, self._text)

class NumberedStep(Flowable):
    def __init__(self, number, title, subtitle=''):
        super().__init__()
        self._num = str(number).zfill(2)
        self._title = title; self._sub = subtitle
    def wrap(self, availW, availH):
        self.width = availW
        self.height = 38 if self._sub else 28
        return self.width, self.height
    def draw(self):
        c = self.canv
        c.setFillColor(C_CARAMEL_SOFT)
        c.circle(14, self.height / 2, 12, fill=1, stroke=0)
        c.setFillColor(C_CARAMEL); c.setFont('Helvetica-Bold', 9)
        c.drawCentredString(14, self.height / 2 - 4, self._num)
        c.setFillColor(C_INK); c.setFont('Helvetica-Bold', 10.5)
        c.drawString(34, self.height - 14, self._title)
        if self._sub:
            c.setFillColor(C_GRAY); c.setFont('Helvetica', 9)
            c.drawString(34, self.height - 28, self._sub)

class CheckItem(Flowable):
    def __init__(self, text, indent=0):
        super().__init__(); self._text = text; self._indent = indent
    def wrap(self, availW, availH):
        self.width = availW; self.height = 20
        return self.width, self.height
    def draw(self):
        c = self.canv; x = self._indent
        c.setStrokeColor(C_BORDER); c.setLineWidth(0.75)
        c.rect(x, 4, 11, 11, fill=0, stroke=1)
        c.setFillColor(C_INK); c.setFont('Helvetica', 9.5)
        c.drawString(x + 18, 7, self._text)

# ── Page templates ─────────────────────────────────────────────────────────────
class LPTPageTemplate:
    def __init__(self, skip_pages=(1,), back_cover_page=None):
        self._skip = skip_pages
        self._back = back_cover_page
        self._current = 0

    def on_page(self, canv, doc):
        self._current += 1
        if self._current == self._back:
            canv.saveState()
            canv.setFillColor(C_CARAMEL)
            canv.rect(0, 0, W, H, fill=1, stroke=0)
            canv.restoreState()
            return
        if self._current in self._skip:
            return
        canv.saveState()
        canv.setStrokeColor(C_BORDER); canv.setLineWidth(0.5)
        canv.line(MARGIN_H, 18 * mm, W - MARGIN_H, 18 * mm)
        canv.setFillColor(C_GRAY_LT); canv.setFont('Helvetica', 8)
        canv.drawCentredString(W / 2, 14 * mm,
            f'LaPasseTech — Rentrer dans le digital — Page {self._current}')
        canv.setFont('Helvetica-Bold', 8); canv.setFillColor(C_CARAMEL)
        canv.drawString(MARGIN_H, 14 * mm, 'LaPasseTech')
        canv.restoreState()

# ── Helper builders ────────────────────────────────────────────────────────────
def card(content_rows, bg=C_CREAM, border=C_BORDER, radius=6,
         col_widths=None, row_heights=None, pad=8):
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

def two_col_table(left_items, right_items, lw_ratio=0.5, bg_l=C_CREAM, bg_r=C_PAPER):
    lw = TEXT_W * lw_ratio - 3
    rw = TEXT_W * (1 - lw_ratio) - 3

    def inner(items, w):
        t = Table([[i] for i in items], colWidths=[w - 12])
        t.setStyle(TableStyle([
            ('TOPPADDING', (0,0),(-1,-1), 3),
            ('BOTTOMPADDING', (0,0),(-1,-1), 3),
            ('LEFTPADDING', (0,0),(-1,-1), 0),
            ('RIGHTPADDING', (0,0),(-1,-1), 0),
        ]))
        return t

    data = [[inner(left_items, lw), inner(right_items, rw)]]
    outer = Table(data, colWidths=[lw, rw])
    outer.setStyle(TableStyle([
        ('BACKGROUND', (0,0),(0,-1), bg_l),
        ('BACKGROUND', (1,0),(1,-1), bg_r),
        ('BOX', (0,0),(-1,-1), 0.75, C_BORDER),
        ('LINEAFTER', (0,0),(0,-1), 0.5, C_BORDER),
        ('ROUNDEDCORNERS', [6]),
        ('TOPPADDING', (0,0),(-1,-1), 10),
        ('BOTTOMPADDING', (0,0),(-1,-1), 10),
        ('LEFTPADDING', (0,0),(-1,-1), 12),
        ('RIGHTPADDING', (0,0),(-1,-1), 12),
        ('VALIGN', (0,0),(-1,-1), 'TOP'),
    ]))
    return outer

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

def warning_card(items):
    data = [[item] for item in items]
    t = Table(data, colWidths=[TEXT_W - 2])
    t.setStyle(TableStyle([
        ('BACKGROUND', (0,0),(-1,-1), C_RED_SOFT),
        ('BOX', (0,0),(-1,-1), 1.0, C_RED),
        ('ROUNDEDCORNERS', [6]),
        ('TOPPADDING', (0,0),(-1,-1), 10),
        ('BOTTOMPADDING', (0,0),(-1,-1), 10),
        ('LEFTPADDING', (0,0),(-1,-1), 14),
        ('RIGHTPADDING', (0,0),(-1,-1), 14),
    ]))
    return t

def sp(n=6):
    return Spacer(1, n)

# ── Cover page ─────────────────────────────────────────────────────────────────
def draw_cover(c):
    import random

    # 1. Fond de base chaud
    c.setFillColor(HexColor('#C8A882'))
    c.rect(0, 0, W, H, fill=1, stroke=0)

    # 2. Formes organiques
    c.saveState(); c.setFillColor(HexColor('#E8D0B0'))
    c.ellipse(W * 0.55, H * 0.65, W * 1.1, H * 1.05, fill=1, stroke=0); c.restoreState()
    c.saveState(); c.setFillColor(HexColor('#8B6040'))
    c.ellipse(W * 0.2, H * 0.15, W * 0.82, H * 0.88, fill=1, stroke=0); c.restoreState()
    c.saveState(); c.setFillColor(HexColor('#D4A870'))
    c.ellipse(W * 0.28, H * 0.52, W * 0.74, H * 0.95, fill=1, stroke=0); c.restoreState()
    c.saveState(); c.setFillColor(HexColor('#5A3820'))
    c.rect(0, 0, W * 0.22, H, fill=1, stroke=0); c.restoreState()
    c.saveState(); c.setFillColor(HexColor('#4A2E18'))
    c.rect(0, 0, W, H * 0.18, fill=1, stroke=0); c.restoreState()
    c.saveState(); c.setFillColor(HexColor('#E8C898'))
    c.ellipse(W * 0.38, H * 0.55, W * 0.65, H * 0.82, fill=1, stroke=0); c.restoreState()

    # 3. Filtre caramel
    c.saveState(); c.setFillColor(C_CARAMEL); c.setFillAlpha(0.58)
    c.rect(0, 0, W, H, fill=1, stroke=0); c.restoreState()

    # 4. Grain photo
    c.saveState(); c.setFillColor(HexColor('#000000'))
    random.seed(42); c.setFillAlpha(0.03)
    for _ in range(2200):
        px = random.uniform(0, W); py = random.uniform(0, H)
        c.circle(px, py, 0.6, fill=1, stroke=0)
    c.restoreState()

    # 5. Vignette bas
    c.saveState()
    for i in range(12):
        c.setFillColor(C_CARAMEL_DEEP); c.setFillAlpha((i / 12) * 0.65 * 0.7)
        c.rect(0, (i / 12) * H * 0.38, W, H * 0.38 / 12 + 1, fill=1, stroke=0)
    c.restoreState()

    # 6. Vignette haut
    c.saveState()
    for i in range(8):
        c.setFillColor(C_CARAMEL_DEEP); c.setFillAlpha(((8 - i) / 8) * 0.36)
        c.rect(0, H - (i / 8) * H * 0.30, W, H * 0.30 / 8 + 1, fill=1, stroke=0)
    c.restoreState()

    c.setFillAlpha(1.0)

    # 7. Barre jaune top
    c.setFillColor(C_YELLOW)
    c.rect(0, H - 3.5 * mm, W, 3.5 * mm, fill=1, stroke=0)

    # 8. Wordmark
    tx = MARGIN_H
    c.setFillColor(C_CREAM); c.setFont('Helvetica-Bold', 16)
    c.drawString(tx, H - MARGIN_V - 6, 'LaPasseTech')
    c.setFillColor(HexColor('#F2E2CC')); c.setFont('Helvetica', 9)
    c.drawRightString(W - tx, H - MARGIN_V - 6, 'GUIDE PDF  ·  2026')

    # 9. Eyebrow
    c.setFillColor(C_CREAM); c.setFont('Helvetica-Bold', 8.5)
    eyebrow = 'RECONVERSION  SANS  BULLSHIT'
    c.drawString(tx, H * 0.72, eyebrow)
    ew = len(eyebrow) * 5.2
    c.setStrokeColor(C_YELLOW); c.setLineWidth(1.5)
    c.line(tx, H * 0.72 - 5, tx + ew, H * 0.72 - 5)

    # 10. Barre verticale jaune
    c.setFillColor(C_YELLOW)
    c.rect(tx - 4, H * 0.24, 3, H * 0.44, fill=1, stroke=0)

    # 11. Titre — 3 lignes
    c.setFillColor(C_PAPER)
    c.setFont('Helvetica-Bold', 36)
    c.drawString(tx, H * 0.66, 'Rentrer dans le digital')
    c.setFont('Helvetica-Bold', 30)
    c.drawString(tx, H * 0.61, 'sans le réseau,')
    c.setFillColor(C_CARAMEL_SOFT)
    c.setFont('Helvetica-BoldOblique', 26)
    c.drawString(tx, H * 0.565, 'sans la grande école.')

    # 12. Stats — 3 métriques
    stats_y = H * 0.48
    stats_data = [('6', 'étapes concrètes'), ('0€', 'de ta poche'), ('+35k', 'salaire d\'entrée')]
    stat_col_w = (W - 2 * tx) / 3
    for i, (val, label) in enumerate(stats_data):
        sx = tx + i * stat_col_w
        if i > 0:
            c.saveState(); c.setStrokeColor(C_CARAMEL_SOFT); c.setFillAlpha(0.4)
            c.setLineWidth(0.5); c.line(sx, stats_y - 2, sx, stats_y + 32); c.restoreState()
        c.setFillColor(C_CREAM); c.setFont('Helvetica-Bold', 20)
        c.drawString(sx + 6, stats_y + 12, val)
        c.setFillColor(C_CARAMEL_SOFT); c.setFont('Helvetica', 8)
        c.drawString(sx + 6, stats_y, label)

    # 13. Step chips — 6 étapes
    chips = ['00 · INTRO', '01 · MÉTIERS', '02 · FINANCER', '03 · FORMATION', '04 · POSITIONNER', '05 · LE JOB']
    chip_y = H * 0.39
    cx = tx
    for chip_text in chips:
        chip_w = len(chip_text) * 5.6 + 16
        chip_h = 17
        c.saveState(); c.setFillColor(C_PAPER); c.setFillAlpha(0.12)
        c.roundRect(cx, chip_y, chip_w, chip_h, chip_h / 2, fill=1, stroke=0)
        c.restoreState()
        c.setFillColor(C_CREAM); c.setFont('Helvetica-Bold', 7)
        c.drawCentredString(cx + chip_w / 2, chip_y + 5, chip_text)
        cx += chip_w + 5

    # 14. Auteur
    c.setFillColor(C_PAPER); c.setFont('Helvetica-Bold', 13)
    c.drawString(tx, H * 0.21 + 14, 'Guy')
    c.setFillColor(C_CARAMEL_SOFT); c.setFont('Helvetica', 10.5)
    c.drawString(tx, H * 0.21, 'Business Analyst  ·  Fondateur de LaPasseTech')

    # 15. Badge
    pill_w, pill_h = 164, 22
    c.setFillColor(C_YELLOW)
    c.roundRect(tx, H * 0.12, pill_w, pill_h, pill_h / 2, fill=1, stroke=0)
    c.setFillColor(C_BLACK); c.setFont('Helvetica-Bold', 9)
    c.drawCentredString(tx + pill_w / 2, H * 0.12 + 7, 'Guide gratuit  ·  14 pages')


# ── Build story ────────────────────────────────────────────────────────────────
def build():
    story = []
    tpl = LPTPageTemplate(skip_pages=(), back_cover_page=13)

    # ─────────────────────────────────────────────────────────────────────────
    # PAGE 1 — COUVERTURE (dessinée via draw_cover sur canvas)
    # ─────────────────────────────────────────────────────────────────────────
    story.append(PageBreak())

    # ─────────────────────────────────────────────────────────────────────────
    # PAGE 2 — AVANT-PROPOS
    # ─────────────────────────────────────────────────────────────────────────
    story.append(Paragraph('Avant-propos', s_eyebrow))
    story.append(Paragraph('Ce guide existe parce que j\'ai cherché ce qu\'il contient — et je ne l\'ai pas trouvé.', s_h1))
    story.append(HR())
    story.append(sp(6))
    story.append(Paragraph(
        "Quand j'ai voulu me reconvertir à 38 ans, j'avais 16 ans d'expérience en marketing digital. "
        "Je ne savais pas quels métiers IT étaient accessibles sans coder. Je ne savais pas que "
        "des dispositifs finançaient la formation à 100%. Je ne connaissais pas la POEI.",
        s_body))
    story.append(Paragraph(
        "J'ai fait le chemin seul, à tâtons, en lisant des articles contradictoires et en "
        "payant quelques erreurs de parcours. Ce guide, c'est ce chemin — condensé, "
        "structuré, honnête. Avec les vrais chiffres, pas les médianes flatteuses.",
        s_body))
    story.append(sp(8))
    story.append(Paragraph(
        '<i>"Ce n\'est pas le métier que tu choisis. C\'est la vie que tu construis."</i>',
        s_quote))
    story.append(sp(12))

    story.append(card([
        Paragraph('Mon engagement envers toi', s_eyebrow),
        sp(4),
        Paragraph('<b>·</b> Les métiers réalistes — pas les métiers sexy du moment', s_body),
        Paragraph('<b>·</b> Les vrais salaires d\'entrée — pas les moyennes gonflées par les seniors', s_body),
        Paragraph('<b>·</b> Les dispositifs qui existent vraiment — pas ceux qui sonnent bien', s_body),
        Paragraph('<b>·</b> Les 6 étapes dans l\'ordre — pas une liste de conseils génériques', s_body),
        Paragraph('<b>·</b> Les erreurs que j\'ai commises — pour que tu ne les répètes pas', s_body),
    ], bg=C_CARAMEL_SOFT, border=C_CARAMEL, pad=12))
    story.append(sp(12))
    story.append(Paragraph(
        'Ce guide est structuré en 6 étapes. Suis-les dans l\'ordre. '
        'Chaque étape s\'appuie sur la précédente.',
        s_body))
    story.append(PageBreak())

    # ─────────────────────────────────────────────────────────────────────────
    # PAGE 3 — ÉTAPE 00 — L'INTROSPECTION
    # ─────────────────────────────────────────────────────────────────────────
    story.append(BadgePill('ÉTAPE 00', bg_color=C_INK))
    story.append(sp(6))
    story.append(Paragraph('L\'introspection', s_h1))
    story.append(HR())
    story.append(sp(4))

    story.append(warning_card([
        Paragraph('<b>Cette étape, tu vas avoir envie de la sauter. Ne le fais pas.</b>',
                  S('WarnTitle', fontName='Helvetica-Bold', fontSize=10.5,
                    textColor=C_RED, leading=15, spaceAfter=4)),
        Paragraph(
            'La majorité des reconversions qui échouent échouent ici — pas sur la formation, '
            'pas sur le financement. Sur le choix du mauvais métier, parce qu\'on n\'a pas '
            'pris le temps de se poser les bonnes questions.',
            S('WarnBody', fontName='Helvetica', fontSize=10, textColor=C_INK, leading=15)),
    ]))
    story.append(sp(10))

    # 4 questions en 2x2
    story.append(Paragraph('Les 4 questions à te poser', s_h2))
    story.append(sp(4))

    q_data = [[
        card([
            Paragraph('01', S('QN', fontName='Helvetica-Bold', fontSize=16,
                               textColor=C_CARAMEL, leading=20, spaceAfter=4)),
            Paragraph(
                'Qu\'est-ce que tu faisais <b>naturellement</b> dans ton ancien poste, '
                'même sans qu\'on te le demande ?',
                s_body),
        ], bg=C_CREAM, pad=10),
        card([
            Paragraph('02', S('QN2', fontName='Helvetica-Bold', fontSize=16,
                               textColor=C_CARAMEL, leading=20, spaceAfter=4)),
            Paragraph(
                'Quelle partie de ton travail t\'ennuyait le <b>moins</b> — '
                'même un lundi matin ?',
                s_body),
        ], bg=C_CREAM, pad=10),
    ], [
        card([
            Paragraph('03', S('QN3', fontName='Helvetica-Bold', fontSize=16,
                               textColor=C_CARAMEL, leading=20, spaceAfter=4)),
            Paragraph(
                'Si tu devais apprendre quelque chose pendant <b>6 mois intensifs</b>, '
                'ce serait quoi ?',
                s_body),
        ], bg=C_CREAM, pad=10),
        card([
            Paragraph('04', S('QN4', fontName='Helvetica-Bold', fontSize=16,
                               textColor=C_CARAMEL, leading=20, spaceAfter=4)),
            Paragraph(
                'Qu\'est-ce que tes <b>collègues te demandaient</b> souvent '
                'de l\'aide pour faire ?',
                s_body),
        ], bg=C_CREAM, pad=10),
    ]]

    col_w2 = TEXT_W / 2 - 4
    q_table = Table(q_data, colWidths=[col_w2, col_w2])
    q_table.setStyle(TableStyle([
        ('TOPPADDING', (0,0),(-1,-1), 4),
        ('BOTTOMPADDING', (0,0),(-1,-1), 4),
        ('LEFTPADDING', (0,0),(-1,-1), 0),
        ('RIGHTPADDING', (0,0),(-1,-1), 0),
        ('LEFTPADDING', (1,0),(1,-1), 6),
    ]))
    story.append(q_table)
    story.append(sp(10))

    story.append(card([
        Paragraph('Exercice — La lettre à toi dans 2 ans', s_eyebrow),
        Paragraph(
            'Prends 10 minutes. Écris une lettre à toi-même, dans 2 ans. '
            'Tu décris ta semaine : ton métier, ton environnement, ce que tu fais concrètement. '
            'Pas un rêve — une description réaliste de ce que tu veux construire.',
            s_body),
    ], bg=C_CARAMEL_SOFT, border=C_CARAMEL, pad=12))
    story.append(sp(10))

    # 2 mythes
    story.append(Paragraph('2 mythes à déconstruire maintenant', s_h3))
    myth_data = [
        ['Mythe 1 — "Il faut savoir coder"',
         'Les 4 métiers de ce guide sont accessibles sans écrire une ligne de code. '
         'Business Analyst, Data Analyst, QA, Cybersécurité — tous recrutent des profils non-développeurs.'],
        ['Mythe 2 — "C\'est trop tard après 35 ans"',
         'Faux. Ton expérience métier est un atout que les juniors n\'ont pas. '
         'Les recruteurs cherchent des profils hybrides — quelqu\'un qui comprend le métier ET la tech.'],
    ]
    for myth_title, myth_body in myth_data:
        t = Table([[
            Paragraph('✕', S('MythX', fontName='Helvetica-Bold', fontSize=16,
                               textColor=C_CARAMEL_SOFT, leading=20)),
            [Paragraph(f'<b>{myth_title}</b>',
                       S('MythT', fontName='Helvetica-Bold', fontSize=10.5,
                         textColor=C_INK, leading=14, spaceAfter=3)),
             Paragraph(myth_body, s_body)],
        ]], colWidths=[28, TEXT_W - 30])
        t.setStyle(TableStyle([
            ('BACKGROUND', (0,0),(-1,-1), C_PAPER),
            ('BOX', (0,0),(-1,-1), 0.5, C_BORDER),
            ('TOPPADDING', (0,0),(-1,-1), 10),
            ('BOTTOMPADDING', (0,0),(-1,-1), 10),
            ('LEFTPADDING', (0,0),(-1,-1), 12),
            ('RIGHTPADDING', (0,0),(-1,-1), 12),
            ('VALIGN', (0,0),(-1,-1), 'TOP'),
        ]))
        story.append(t); story.append(sp(5))
    story.append(PageBreak())

    # ─────────────────────────────────────────────────────────────────────────
    # PAGE 4 — ÉTAPE 01 — LES MÉTIERS ACCESSIBLES
    # ─────────────────────────────────────────────────────────────────────────
    story.append(BadgePill('ÉTAPE 01', bg_color=C_CARAMEL))
    story.append(sp(6))
    story.append(Paragraph('Les métiers accessibles sans coder', s_h1))
    story.append(HR())
    story.append(sp(4))
    story.append(Paragraph(
        '4 métiers IT avec de vraies portes d\'entrée pour les reconvertis. '
        'Classés par accessibilité — le dernier est celui que j\'ai choisi.',
        s_body))
    story.append(sp(8))

    metiers = [
        ('Cybersécurité', '32 - 50 k€/an', C_GREEN,
         'Protéger les systèmes contre les attaques. Surveiller, détecter, répondre aux incidents.',
         ['Logique réseau', 'CompTIA / CEH', 'Anglais technique']),
        ('Data Analyst', '35 - 55 k€/an', C_GREEN,
         'Transformer des données en décisions. SQL, Power BI, tableaux de bord.',
         ['Excel / SQL', 'Power BI ou Tableau', 'Curiosité analytique']),
        ('QA / Testeur', '30 - 48 k€/an', C_CARAMEL,
         'S\'assurer que les logiciels fonctionnent avant la production. Tests manuels puis automatisés.',
         ['Rigueur', 'ISTQB Foundation', 'Documentation']),
        ('Business Analyst', '36 - 55 k€/an', C_CARAMEL,
         'Faire le lien entre équipes métier et tech. Salesforce, spécifications, ateliers.',
         ['Écoute active', 'Rédaction', 'Salesforce / CRM']),
    ]

    for metier_name, salary, color, description, skill_tags in metiers:
        skill_pills = '   '.join(
            f'<font color="{color.hexval()}"><b>· {tag}</b></font>' for tag in skill_tags
        )
        header_t = Table([[
            Paragraph(f'<font color="{color.hexval()}"><b>{metier_name}</b></font>',
                      S(f'MN_{metier_name}', fontName='Helvetica-Bold', fontSize=13,
                        textColor=color, leading=17)),
            Paragraph(f'<b>{salary}</b>',
                      S(f'Sal_{metier_name}', fontName='Helvetica-Bold', fontSize=10.5,
                        textColor=C_INK, leading=14, alignment=TA_RIGHT)),
        ]], colWidths=[TEXT_W * 0.62, TEXT_W * 0.38 - 28])
        header_t.setStyle(TableStyle([
            ('TOPPADDING', (0,0),(-1,-1), 0), ('BOTTOMPADDING', (0,0),(-1,-1), 0),
            ('LEFTPADDING', (0,0),(-1,-1), 0), ('RIGHTPADDING', (0,0),(-1,-1), 0),
            ('VALIGN', (0,0),(-1,-1), 'BOTTOM'),
        ]))
        outer = Table([[header_t],
                        [Paragraph(description, s_body)],
                        [Paragraph(skill_pills, S(f'Sk_{metier_name}', fontName='Helvetica',
                                                   fontSize=8.5, textColor=C_GRAY, leading=13))]],
                      colWidths=[TEXT_W - 2])
        outer.setStyle(TableStyle([
            ('BACKGROUND', (0,0),(-1,-1), C_PAPER),
            ('BOX', (0,0),(-1,-1), 0.75, C_BORDER),
            ('LINEBEFORE', (0,0),(0,-1), 3, color),
            ('ROUNDEDCORNERS', [6]),
            ('TOPPADDING', (0,0),(-1,-1), 8),
            ('BOTTOMPADDING', (0,0),(-1,-1), 7),
            ('LEFTPADDING', (0,0),(-1,-1), 12),
            ('RIGHTPADDING', (0,0),(-1,-1), 12),
        ]))
        story.append(outer); story.append(sp(5))
    story.append(PageBreak())

    # ─────────────────────────────────────────────────────────────────────────
    # PAGE 5 — ÉTAPE 02 — FINANCEMENT
    # ─────────────────────────────────────────────────────────────────────────
    story.append(BadgePill('ÉTAPE 02', bg_color=C_CARAMEL))
    story.append(sp(6))
    story.append(Paragraph('Financer sans payer', s_h1))
    story.append(HR())
    story.append(sp(4))

    story.append(card([
        Paragraph(
            '<i>"En France, ta reconversion peut coûter 0€. '
            'La plupart des gens ne le savent pas. Ce chapitre t\'explique comment."</i>',
            s_quote_cream),
    ], bg=C_CARAMEL, border=C_CARAMEL, pad=16))
    story.append(sp(10))

    story.append(Paragraph('Les 4 dispositifs', s_h2))
    story.append(sp(6))

    # 4 cards de financement en 2x2
    fin_cards = [
        ('CPF', 'Compte Personnel de Formation',
         'Pour tout le monde. Jusqu\'à 5 000€. Géré sur moncompteformation.gouv.fr. '
         'Reste à charge 100€ depuis mai 2024 (sauf demandeurs d\'emploi).',
         C_CARAMEL_SOFT, C_CARAMEL),
        ('POEI', 'Préparation Op. à l\'Emploi Individuelle',
         'Pour les demandeurs d\'emploi. 100% financé par France Travail. '
         'Emploi garanti à la sortie. Le dispositif le plus puissant — détail page suivante.',
         C_GREEN_SOFT, C_GREEN),
        ('PTP', 'Projet de Transition Professionnelle',
         'Pour les salariés CDI (2 ans d\'ancienneté). Salaire maintenu pendant la formation. '
         'Jusqu\'à 1 an. Dossier plus complexe mais très puissant.',
         C_CREAM, C_CARAMEL),
        ('AIF', 'Aide Individuelle à la Formation (France Travail)',
         'Pour les demandeurs d\'emploi dont la formation n\'est pas couverte par la POEI. '
         'Montant variable selon les dossiers. Demander à son conseiller.',
         C_CREAM, C_CARAMEL),
    ]

    lw = TEXT_W / 2 - 4
    fin_left = []
    fin_right = []
    for i, (abbrev, full_name, desc, bg, acc) in enumerate(fin_cards):
        card_content = Table([[
            Paragraph(f'<font color="{acc.hexval()}"><b>{abbrev}</b></font>',
                      S(f'FA{i}', fontName='Helvetica-Bold', fontSize=18,
                        textColor=acc, leading=22)),
            [Paragraph(f'<b>{full_name}</b>',
                       S(f'FN{i}', fontName='Helvetica-Bold', fontSize=9,
                         textColor=C_INK, leading=12, spaceAfter=4)),
             Paragraph(desc, s_small)],
        ]], colWidths=[38, lw - 60])
        card_content.setStyle(TableStyle([
            ('BACKGROUND', (0,0),(-1,-1), bg),
            ('BOX', (0,0),(-1,-1), 0.75, acc),
            ('ROUNDEDCORNERS', [6]),
            ('TOPPADDING', (0,0),(-1,-1), 10),
            ('BOTTOMPADDING', (0,0),(-1,-1), 10),
            ('LEFTPADDING', (0,0),(-1,-1), 10),
            ('RIGHTPADDING', (0,0),(-1,-1), 10),
            ('VALIGN', (0,0),(-1,-1), 'TOP'),
        ]))
        if i % 2 == 0:
            fin_left.append(card_content); fin_left.append(sp(6))
        else:
            fin_right.append(card_content); fin_right.append(sp(6))

    fin_table = Table([[
        Table([[item] for item in fin_left], colWidths=[lw]),
        Table([[item] for item in fin_right], colWidths=[lw]),
    ]], colWidths=[lw, lw])
    fin_table.setStyle(TableStyle([
        ('TOPPADDING', (0,0),(-1,-1), 0),
        ('BOTTOMPADDING', (0,0),(-1,-1), 0),
        ('LEFTPADDING', (0,0),(-1,-1), 0),
        ('RIGHTPADDING', (0,0),(-1,-1), 0),
        ('LEFTPADDING', (1,0),(1,-1), 8),
        ('VALIGN', (0,0),(-1,-1), 'TOP'),
    ]))
    story.append(fin_table)
    story.append(sp(10))

    story.append(Paragraph('Stratégie en 4 étapes', s_h3))
    story.append(sp(4))
    strategy = [
        ('1', 'Vérifie ton solde CPF', 'moncompteformation.gouv.fr — 5 minutes'),
        ('2', 'Identifie ta situation', 'Salarié, demandeur d\'emploi, ou en rupture conventionnelle ?'),
        ('3', 'Contacte un CEP gratuit', 'Conseil en Évolution Professionnelle — sans engagement'),
        ('4', 'Cible les formations POEI', 'Si tu es en recherche d\'emploi, commence par là'),
    ]
    for num, title, sub in strategy:
        story.append(NumberedStep(num, title, sub))
        story.append(sp(4))
    story.append(PageBreak())

    # ─────────────────────────────────────────────────────────────────────────
    # PAGE 6 — FOCUS POEI (PARTIE 1)
    # ─────────────────────────────────────────────────────────────────────────
    story.append(BadgePill('FOCUS POEI', bg_color=C_GREEN))
    story.append(sp(6))
    story.append(Paragraph('Le dispositif le plus efficace — et le moins connu', s_h1))
    story.append(HR())
    story.append(sp(4))

    story.append(card([
        Paragraph(
            '<b>POEI = Préparation Opérationnelle à l\'Emploi Individuelle.</b> '
            'Une entreprise identifie un candidat potentiel, engage de le recruter, '
            'et France Travail finance la formation à 100%. Tu te formes avec un emploi qui t\'attend.',
            s_body),
    ], bg=C_GREEN_SOFT, border=C_GREEN, pad=12))
    story.append(sp(10))

    # Left: 4 étapes du processus / Right: Organismes
    poei_steps = [
        Paragraph('Comment ça marche', S('PSH', fontName='Helvetica-Bold', fontSize=11,
                                           textColor=C_INK, leading=14, spaceAfter=8)),
        NumberedStep('1', 'Tu identifies une offre POEI', 'LinkedIn, France Travail, contact direct ESN'),
        sp(5),
        NumberedStep('2', 'L\'entreprise valide avec France Travail', 'Elle s\'engage à t\'embaucher'),
        sp(5),
        NumberedStep('3', 'France Travail finance la formation', 'De 3 à 6 mois, 100% pris en charge'),
        sp(5),
        NumberedStep('4', 'Tu décroches ton CDI à la sortie', 'Le contrat est signé avant la formation'),
        sp(8),
        BadgePill('100% GRATUIT', bg_color=C_GREEN, font_size=9),
    ]

    orga_items = [
        Paragraph('Organismes qui proposent des POEI', S('OrgH', fontName='Helvetica-Bold', fontSize=11,
                                                           textColor=C_INK, leading=14, spaceAfter=8)),
        Paragraph('<b>·</b> M2i Formation', s_body),
        Paragraph('<b>·</b> Adaltas / Nextech', s_body),
        Paragraph('<b>·</b> Salesforce Trailhead Academy', s_body),
        Paragraph('<b>·</b> OpenClassrooms', s_body),
        Paragraph('<b>·</b> ORSYS', s_body),
        Paragraph('<b>·</b> Cegos', s_body),
        Paragraph('<b>·</b> Wild Code School', s_body),
        Paragraph('<b>·</b> Le Wagon', s_body),
    ]

    poei_col = two_col_table(poei_steps, orga_items, lw_ratio=0.52,
                              bg_l=C_CREAM, bg_r=C_PAPER)
    story.append(poei_col)
    story.append(sp(12))

    story.append(card([
        Paragraph('Ce que peu de gens savent', s_eyebrow),
        Paragraph(
            'La POEI ne se trouve pas en candidatant sur une offre d\'emploi classique. '
            'Elle se trouve en contactant directement les <b>recruteurs des ESN</b> '
            '(Entreprises de Services Numériques) et en indiquant que tu es '
            '<b>disponible via POEI</b>. C\'est là que le dispositif s\'active.',
            s_body),
    ], bg=C_CARAMEL_SOFT, border=C_CARAMEL, pad=12))
    story.append(PageBreak())

    # ─────────────────────────────────────────────────────────────────────────
    # PAGE 7 — POEI SUITE (profils, ESN, comment démarrer)
    # ─────────────────────────────────────────────────────────────────────────
    story.append(Paragraph('POEI — témoignage et profils', s_eyebrow))
    story.append(Paragraph('Qui décroche une POEI — et comment s\'y prendre', s_h1))
    story.append(HR())
    story.append(sp(6))

    story.append(card([
        Paragraph(
            '<i>"J\'ai découvert la POEI en cherchant comment rejoindre une ESN sans réseau. '
            'J\'ai passé trois semaines à comprendre le fonctionnement du dispositif — '
            'à contacter des gens sur LinkedIn, à lire des forums. '
            'Ce guide te fait gagner ces trois semaines."</i>',
            s_quote_cream),
        sp(4),
        Paragraph('— Guy, Business Analyst Salesforce · Reconverti à 38 ans',
                  S('AuthorQ', fontName='Helvetica-Bold', fontSize=9,
                    textColor=C_CARAMEL_SOFT, leading=13)),
    ], bg=C_CARAMEL, border=C_CARAMEL, pad=14))
    story.append(sp(10))

    # Profils cohorte 2x3
    story.append(Paragraph('Exemples de profils en cohorte POEI', s_h3))
    story.append(sp(6))
    profils = [
        ('Ex-Commercial', 'BA Salesforce'),
        ('Ex-RH', 'Chef de projet digital'),
        ('Ex-Comptable', 'Data Analyst'),
        ('Ex-Enseignant', 'UX Designer'),
        ('Ex-Marketing', 'Business Analyst'),
        ('Ex-Journaliste', 'Expert SEO'),
    ]
    profil_rows = [profils[i:i+3] for i in range(0, 6, 3)]
    pcw = TEXT_W / 3 - 4
    for row in profil_rows:
        row_data = []
        for avant, apres in row:
            inner_t = Table([
                [Paragraph(avant,
                            S('PAvant', fontName='Helvetica', fontSize=9,
                              textColor=C_GRAY_LT, leading=12))],
                [Paragraph('→', S('Arr', fontName='Helvetica-Bold', fontSize=12,
                                   textColor=C_CARAMEL, leading=14))],
                [Paragraph(f'<b>{apres}</b>',
                            S('PApres', fontName='Helvetica-Bold', fontSize=9.5,
                              textColor=C_INK, leading=13))],
            ], colWidths=[pcw - 20])
            inner_t.setStyle(TableStyle([
                ('BACKGROUND', (0,0),(-1,-1), C_CREAM),
                ('BOX', (0,0),(-1,-1), 0.5, C_BORDER),
                ('ROUNDEDCORNERS', [5]),
                ('TOPPADDING', (0,0),(-1,-1), 8),
                ('BOTTOMPADDING', (0,0),(-1,-1), 8),
                ('LEFTPADDING', (0,0),(-1,-1), 10),
                ('RIGHTPADDING', (0,0),(-1,-1), 10),
                ('VALIGN', (0,0),(-1,-1), 'MIDDLE'),
            ]))
            row_data.append(inner_t)
        pt = Table([row_data], colWidths=[pcw, pcw, pcw])
        pt.setStyle(TableStyle([
            ('TOPPADDING', (0,0),(-1,-1), 0),
            ('BOTTOMPADDING', (0,0),(-1,-1), 0),
            ('LEFTPADDING', (0,0),(-1,-1), 0),
            ('RIGHTPADDING', (0,0),(-1,-1), 0),
            ('LEFTPADDING', (1,0),(1,-1), 5),
            ('LEFTPADDING', (2,0),(2,-1), 5),
        ]))
        story.append(pt); story.append(sp(5))

    story.append(sp(8))

    # ESN list + comment démarrer
    esn_items = [
        Paragraph('ESN qui recrutent via POEI', S('ESNH', fontName='Helvetica-Bold', fontSize=11,
                                                    textColor=C_INK, leading=14, spaceAfter=6)),
        Paragraph('Capgemini · Sopra Steria · Devoteam', s_body_strong),
        Paragraph('Accenture · Wavestone · CGI France', s_body_strong),
    ]
    start_items = [
        Paragraph('Comment démarrer cette semaine', S('StartH', fontName='Helvetica-Bold', fontSize=11,
                                                       textColor=C_INK, leading=14, spaceAfter=6)),
        Paragraph('<b>1.</b> Sur LinkedIn, tape "POEI Business Analyst [ta ville]"', s_body),
        Paragraph('<b>2.</b> Contacte 5 recruteurs en mentionnant la POEI', s_body),
        Paragraph('<b>3.</b> Précise ton profil et ta disponibilité', s_body),
    ]
    start_col = two_col_table(esn_items, start_items, lw_ratio=0.46,
                               bg_l=C_CREAM, bg_r=C_CARAMEL_SOFT)
    story.append(start_col)
    story.append(PageBreak())

    # ─────────────────────────────────────────────────────────────────────────
    # PAGE 8 — ÉTAPE 03 — FORMATION SELON TA SITUATION
    # ─────────────────────────────────────────────────────────────────────────
    story.append(BadgePill('ÉTAPE 03', bg_color=C_CARAMEL))
    story.append(sp(6))
    story.append(Paragraph('Choisir sa formation', s_h1))
    story.append(HR())
    story.append(sp(4))
    story.append(Paragraph(
        'Le bon dispositif dépend de ta situation aujourd\'hui. '
        'Commence ici.',
        s_body))
    story.append(sp(8))

    sal_items = [
        Paragraph('Tu es salarié(e)', S('SitH1', fontName='Helvetica-Bold', fontSize=12,
                                         textColor=C_CARAMEL, leading=16, spaceAfter=8)),
        Paragraph('<b>CPF</b> — toujours disponible', s_body),
        Paragraph('<b>PTP (Transitions Pro)</b> — si CDI 2 ans+', s_body),
        Paragraph('<b>Plan de formation employeur</b> — à négocier', s_body),
        Paragraph('<b>Congé de formation</b> — avec maintien de salaire', s_body),
    ]
    de_items = [
        Paragraph('Tu es demandeur(se) d\'emploi', S('SitH2', fontName='Helvetica-Bold', fontSize=12,
                                                       textColor=C_GREEN, leading=16, spaceAfter=8)),
        Paragraph('<b>POEI</b> — priorité absolue (100% + emploi)', s_body),
        Paragraph('<b>CPF</b> — sans reste à charge (exonération)', s_body),
        Paragraph('<b>AIF France Travail</b> — complément si besoin', s_body),
        Paragraph('<b>AFC (Action de Formation Conv.)</b>', s_body),
    ]
    situation_col = two_col_table(sal_items, de_items, lw_ratio=0.5,
                                   bg_l=C_CARAMEL_SOFT, bg_r=C_GREEN_SOFT)
    story.append(situation_col)
    story.append(sp(12))

    # Types de formation — tableau
    story.append(Paragraph('Comparatif des types de formation', s_h3))
    story.append(sp(6))
    table_data = [
        ['Type', 'Durée', 'Financement', 'Certifiant', 'Idéal pour'],
        ['Bootcamp', '3-6 mois', 'CPF / POEI', 'Oui (RS)', 'Reconversion rapide'],
        ['Formation à distance', '6-12 mois', 'CPF', 'Oui (RNCP)', 'Salarié en poste'],
        ['Alternance', '12-24 mois', 'Employeur', 'Oui (RNCP)', 'Moins de 30 ans'],
        ['POEI', '3-6 mois', '100% France Travail', 'Oui', 'Dem. emploi'],
    ]
    col_widths_t = [TEXT_W * 0.20, TEXT_W * 0.13, TEXT_W * 0.20,
                    TEXT_W * 0.14, TEXT_W * 0.33]
    t = Table(table_data, colWidths=col_widths_t, repeatRows=1)
    t.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), C_BLACK),
        ('TEXTCOLOR', (0,0), (-1,0), C_CREAM),
        ('FONTNAME', (0,0), (-1,0), 'Helvetica-Bold'),
        ('FONTSIZE', (0,0), (-1,0), 8.5),
        ('BOTTOMPADDING', (0,0), (-1,0), 8),
        ('TOPPADDING', (0,0), (-1,0), 8),
        ('BACKGROUND', (0,1), (-1,1), C_CREAM),
        ('BACKGROUND', (0,2), (-1,2), C_PAPER),
        ('BACKGROUND', (0,3), (-1,3), C_CREAM),
        ('BACKGROUND', (0,4), (-1,4), C_GREEN_SOFT),
        ('FONTNAME', (0,1), (0,-1), 'Helvetica-Bold'),
        ('FONTSIZE', (0,1), (-1,-1), 8.5),
        ('TEXTCOLOR', (0,1), (-1,-1), C_GRAY),
        ('TEXTCOLOR', (0,1), (0,-1), C_INK),
        ('TOPPADDING', (0,1), (-1,-1), 7),
        ('BOTTOMPADDING', (0,1), (-1,-1), 7),
        ('LEFTPADDING', (0,0), (-1,-1), 8),
        ('RIGHTPADDING', (0,0), (-1,-1), 6),
        ('GRID', (0,0), (-1,-1), 0.4, C_BORDER),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
    ]))
    story.append(t)
    story.append(sp(10))

    story.append(warning_card([
        Paragraph('<b>Alerte CPF 2026</b>',
                  S('AlertT', fontName='Helvetica-Bold', fontSize=10.5,
                    textColor=C_RED, leading=14, spaceAfter=4)),
        Paragraph(
            'Depuis le 2 mai 2024, un reste à charge de 100€ est demandé sur toutes '
            'les formations CPF. Les demandeurs d\'emploi sont exonérés. '
            'Vérifie les conditions au moment de ton dossier — les règles évoluent.',
            S('AlertB', fontName='Helvetica', fontSize=9.5, textColor=C_INK, leading=14)),
    ]))
    story.append(PageBreak())

    # ─────────────────────────────────────────────────────────────────────────
    # PAGE 9 — ÉTAPE 04 — DURANT TA FORMATION
    # ─────────────────────────────────────────────────────────────────────────
    story.append(BadgePill('ÉTAPE 04', bg_color=C_CARAMEL))
    story.append(sp(6))
    story.append(Paragraph('Se positionner pendant la formation', s_h1))
    story.append(HR())
    story.append(sp(4))

    story.append(warning_card([
        Paragraph(
            '<b>La formation ne fait pas tout.</b> Ce que tu fais pendant compte autant '
            'que ce que tu apprends. La reconversion, ça se joue dans les marges.',
            S('FlameW', fontName='Helvetica-Bold', fontSize=10.5,
              textColor=C_INK, leading=15)),
    ]))
    story.append(sp(10))

    story.append(Paragraph('3 règles d\'implication', s_h3))
    story.append(sp(4))
    impl_rules = [
        ('Finir les exercices optionnels',
         'Ils font la différence entre les candidats. Les recruteurs le remarquent.'),
        ('Poser des questions — et les noter',
         'Ceux qui posent des questions apprennent deux fois plus vite.'),
        ('Documenter ta progression publiquement',
         'LinkedIn, GitHub, blog court — montre que tu avances.'),
    ]
    for i, (title, desc) in enumerate(impl_rules):
        t = Table([[
            Paragraph(str(i + 1),
                      S(f'IR{i}', fontName='Helvetica-Bold', fontSize=18,
                        textColor=C_CARAMEL_SOFT, leading=22)),
            [Paragraph(f'<b>{title}</b>',
                       S(f'IRT{i}', fontName='Helvetica-Bold', fontSize=10.5,
                         textColor=C_INK, leading=14, spaceAfter=3)),
             Paragraph(desc, s_body)],
        ]], colWidths=[32, TEXT_W - 34])
        t.setStyle(TableStyle([
            ('BACKGROUND', (0,0),(-1,-1), C_CREAM if i % 2 == 0 else C_PAPER),
            ('BOX', (0,0),(-1,-1), 0.5, C_BORDER),
            ('TOPPADDING', (0,0),(-1,-1), 10),
            ('BOTTOMPADDING', (0,0),(-1,-1), 10),
            ('LEFTPADDING', (0,0),(-1,-1), 12),
            ('RIGHTPADDING', (0,0),(-1,-1), 12),
            ('VALIGN', (0,0),(-1,-1), 'TOP'),
        ]))
        story.append(t); story.append(sp(5))

    story.append(sp(8))
    story.append(Paragraph('Construire son réseau pendant la formation', s_h3))
    story.append(sp(4))
    reseau_items = [
        '<b>·</b> Connecter avec tes formateurs sur LinkedIn dès la 1re semaine',
        '<b>·</b> Rejoindre les communautés du métier (Slack, Discord, forums spécialisés)',
        '<b>·</b> Partager tes apprentissages — pas tes diplômes, tes apprentissages',
    ]
    for item in reseau_items:
        story.append(Paragraph(item, s_body))

    story.append(sp(8))
    story.append(card([
        Paragraph(
            '<i>"Le faire savoir est aussi important que le savoir-faire. '
            'Celui qui apprend en silence est invisible pour le marché."</i>',
            s_quote),
    ], bg=C_CARAMEL_SOFT, border=C_CARAMEL, pad=12))
    story.append(PageBreak())

    # ─────────────────────────────────────────────────────────────────────────
    # PAGE 10 — ÉTAPES 04/05 — LINKEDIN + DÉCROCHER LE JOB + CHALLENGE
    # ─────────────────────────────────────────────────────────────────────────
    story.append(Paragraph('Étape 04/05', s_eyebrow))
    story.append(Paragraph('LinkedIn, CV et décrocher le premier poste', s_h1))
    story.append(HR())
    story.append(sp(6))

    # LinkedIn quick wins
    lk_items = [
        Paragraph('LinkedIn — 4 actions prioritaires', S('LKH', fontName='Helvetica-Bold', fontSize=12,
                                                           textColor=C_CARAMEL, leading=16, spaceAfter=8)),
        Paragraph('<b>Photo</b> — professionnelle, sourire, fond neutre', s_body),
        Paragraph('<b>Titre</b> — "En reconversion vers [métier] | [Compétence clé]"', s_body),
        Paragraph('<b>À propos</b> — D\'où tu viens, où tu vas, pourquoi (3 phrases)', s_body),
        Paragraph('<b>Expériences</b> — Quantifie tout : "équipe de 5", "30k contacts CRM"', s_body),
    ]

    job_items = [
        Paragraph('Décrocher le job', S('JobH', fontName='Helvetica-Bold', fontSize=12,
                                         textColor=C_CARAMEL, leading=16, spaceAfter=8)),
        Paragraph('<b>60% des prérequis</b> suffisent pour postuler', s_body),
        Paragraph('<b>Adapte</b> chaque CV à l\'offre — 3 bullets ciblés', s_body),
        Paragraph('<b>En entretien</b> — Explique ton parcours, ne t\'excuse pas', s_body),
        Paragraph('<b>Négocie</b> — les profils hybrides valent plus que le marché ne l\'affiche', s_body),
    ]
    lk_col = two_col_table(lk_items, job_items, lw_ratio=0.5,
                            bg_l=C_CREAM, bg_r=C_PAPER)
    story.append(lk_col)
    story.append(sp(12))

    # Challenge
    story.append(card([
        Paragraph('Challenge — 3 engagements', S('ChH', fontName='Helvetica-Bold', fontSize=13,
                                                   textColor=C_INK, leading=17, spaceAfter=10)),
        CheckItem('Je fais le bilan de mes compétences transférables cette semaine'),
        sp(3),
        CheckItem('Je teste un outil du métier visé ce soir (30 minutes minimum)'),
        sp(3),
        CheckItem('J\'envoie 3 messages LinkedIn à des professionnels du secteur'),
        sp(6),
        Paragraph(
            'Ces 3 actions te donnent plus d\'informations concrètes que '
            '3 semaines de recherche passive sur internet.',
            S('ChSub', fontName='Helvetica-Oblique', fontSize=9.5,
              textColor=C_GRAY_LT, leading=14)),
    ], bg=C_CARAMEL_SOFT, border=C_CARAMEL, pad=14))
    story.append(sp(12))

    story.append(card([
        Paragraph('Ce que j\'aurais aimé qu\'on me dise', s_eyebrow),
        Paragraph(
            '<b>Ne minimise pas ton expérience antérieure en entretien.</b> '
            'C\'est une tentation forte chez les reconvertis : on a peur de paraître '
            'déplacé, alors on s\'excuse de son passé. C\'est une erreur. '
            'Les recruteurs cherchent des profils qui comprennent le métier — '
            'et quelqu\'un qui vient d\'un monde différent voit des choses '
            'qu\'un profil 100% technique ne voit pas.',
            s_body),
    ], bg=C_CREAM, border=C_BORDER, pad=12))
    story.append(PageBreak())

    # ─────────────────────────────────────────────────────────────────────────
    # PAGE 11 — CHECKLIST DE RECONVERSION
    # ─────────────────────────────────────────────────────────────────────────
    story.append(Paragraph('Récapitulatif', s_eyebrow))
    story.append(Paragraph('Checklist de reconversion — Étapes 00 à 05', s_h1))
    story.append(HR())
    story.append(sp(6))

    checklist_sections = [
        ('ÉTAPE 00 — Introspection', C_INK, [
            'J\'ai répondu aux 4 questions de l\'introspection',
            'J\'ai écrit la lettre à moi dans 2 ans',
            'J\'ai identifié mes 3 compétences transférables principales',
        ]),
        ('ÉTAPE 01 — Métier choisi', C_CARAMEL, [
            'J\'ai choisi 1 métier prioritaire parmi les 4',
            'J\'ai testé le métier avec une ressource gratuite (30 min)',
            'J\'ai rencontré au moins 1 professionnel du secteur',
        ]),
        ('ÉTAPE 02 — Financement', C_CARAMEL, [
            'J\'ai vérifié mon solde CPF sur moncompteformation.gouv.fr',
            'J\'ai identifié le bon dispositif pour ma situation',
            'J\'ai contacté un CEP ou mon conseiller France Travail',
        ]),
        ('ÉTAPE 03 — Formation', C_CARAMEL, [
            'J\'ai comparé au moins 3 formations certifiantes (RNCP ou RS)',
            'J\'ai vérifié que la certification est éligible au financement',
            'J\'ai soumis mon dossier de financement',
        ]),
        ('ÉTAPE 04 — Positionnement', C_CARAMEL, [
            'Mon profil LinkedIn est optimisé (photo, titre, à-propos)',
            'Je publie régulièrement sur ma progression',
            'J\'ai rejoint au moins une communauté du secteur',
        ]),
        ('ÉTAPE 05 — Le job', C_GREEN, [
            'Mon CV est adapté au métier visé',
            'J\'ai postulé à au moins 10 offres pertinentes',
            'J\'ai préparé et pratiqué mes entretiens',
        ]),
    ]

    lw_cl = TEXT_W / 2 - 5
    left_sections = checklist_sections[:3]
    right_sections = checklist_sections[3:]

    def build_checklist_col(sections, width):
        items = []
        for section_title, color, checks in sections:
            items.append(Paragraph(
                f'<font color="{color.hexval()}"><b>{section_title}</b></font>',
                S('CLSecT', fontName='Helvetica-Bold', fontSize=9.5,
                  textColor=color, leading=13, spaceAfter=6, spaceBefore=8)))
            for check_text in checks:
                items.append(CheckItem(check_text))
                items.append(sp(3))
        t = Table([[item] for item in items], colWidths=[width])
        t.setStyle(TableStyle([
            ('TOPPADDING', (0,0),(-1,-1), 0),
            ('BOTTOMPADDING', (0,0),(-1,-1), 0),
            ('LEFTPADDING', (0,0),(-1,-1), 0),
            ('RIGHTPADDING', (0,0),(-1,-1), 0),
        ]))
        return t

    cl_table = Table([[
        build_checklist_col(left_sections, lw_cl),
        build_checklist_col(right_sections, lw_cl),
    ]], colWidths=[lw_cl, lw_cl])
    cl_table.setStyle(TableStyle([
        ('TOPPADDING', (0,0),(-1,-1), 0),
        ('BOTTOMPADDING', (0,0),(-1,-1), 0),
        ('LEFTPADDING', (0,0),(-1,-1), 0),
        ('RIGHTPADDING', (0,0),(-1,-1), 0),
        ('LEFTPADDING', (1,0),(1,-1), 16),
        ('VALIGN', (0,0),(-1,-1), 'TOP'),
    ]))
    story.append(cl_table)
    story.append(sp(14))

    story.append(card([
        Paragraph('La règle d\'or', s_eyebrow),
        Paragraph(
            '<i>"La reconversion ne s\'improvise pas — mais elle se construit, étape par étape, '
            'sans jamais avoir besoin d\'être parfait pour commencer. '
            'Le moment idéal pour commencer était il y a 6 mois. '
            'Le deuxième meilleur moment, c\'est maintenant."</i>',
            s_quote),
    ], bg=C_CARAMEL_SOFT, border=C_CARAMEL, pad=14))
    story.append(PageBreak())

    # ─────────────────────────────────────────────────────────────────────────
    # PAGE 12 — ÉTAPE 06 — L'IA COMME COPILOTE
    # ─────────────────────────────────────────────────────────────────────────
    story.append(BadgePill('ÉTAPE 06 — BONUS', bg_color=C_BLACK))
    story.append(sp(6))
    story.append(Paragraph('L\'IA comme copilote de reconversion', s_h1))
    story.append(HR())
    story.append(sp(4))
    story.append(Paragraph(
        'L\'intelligence artificielle ne remplace pas la reconversion. '
        'Elle l\'accélère. Voici comment l\'utiliser concrètement.',
        s_body))
    story.append(sp(10))

    ia_cols = [
        ('Recherche & veille', C_CARAMEL, [
            ('Claude', 'claude.ai', 'Analyse de documents, recherche approfondie, CV'),
            ('ChatGPT', 'chat.openai.com', 'Rédaction, Q&R, préparation entretiens'),
            ('Gemini', 'gemini.google.com', 'Intégré Google, recherche web en temps réel'),
        ]),
        ('Apprentissage', C_GREEN, [
            ('NotebookLM', 'notebooklm.google.com', 'Analyser tes cours PDF, créer des résumés'),
            ('Perplexity', 'perplexity.ai', 'Moteur de recherche IA, sources citées'),
            ('GitHub Copilot', 'github.com/copilot', 'Aide au code (si formation dev)'),
        ]),
        ('Productivité', C_CARAMEL, [
            ('MS Copilot', 'microsoft.com', 'Intégré Office 365, Word, Excel, Teams'),
            ('Notion AI', 'notion.so', 'Organisation, notes, synthèses'),
            ('Perplexity', 'perplexity.ai', 'Veille métier quotidienne'),
        ]),
    ]

    ia_col_w = TEXT_W / 3 - 4
    ia_data = []
    for col_title, col_color, tools in ia_cols:
        col_items = [
            Paragraph(f'<font color="{col_color.hexval()}"><b>{col_title}</b></font>',
                      S('IAColH', fontName='Helvetica-Bold', fontSize=10,
                        textColor=col_color, leading=14, spaceAfter=8)),
        ]
        for tool_name, tool_url, tool_desc in tools:
            col_items.append(
                Table([[
                    [Paragraph(f'<b>{tool_name}</b>',
                               S('TN', fontName='Helvetica-Bold', fontSize=9.5,
                                 textColor=C_INK, leading=13, spaceAfter=2)),
                     Paragraph(tool_desc, s_small),
                     Paragraph(tool_url,
                               S('TU', fontName='Helvetica', fontSize=8,
                                 textColor=col_color, leading=11))],
                ]], colWidths=[ia_col_w - 20])
            )
            col_items[-1].setStyle(TableStyle([
                ('BACKGROUND', (0,0),(-1,-1), C_CREAM),
                ('BOX', (0,0),(-1,-1), 0.5, C_BORDER),
                ('ROUNDEDCORNERS', [4]),
                ('TOPPADDING', (0,0),(-1,-1), 7),
                ('BOTTOMPADDING', (0,0),(-1,-1), 7),
                ('LEFTPADDING', (0,0),(-1,-1), 9),
                ('RIGHTPADDING', (0,0),(-1,-1), 9),
            ]))
            col_items.append(sp(4))
        ia_data.append(col_items)

    ia_outer = Table([[
        Table([[item] for item in col], colWidths=[ia_col_w])
        for col in ia_data
    ]], colWidths=[ia_col_w, ia_col_w, ia_col_w])
    ia_outer.setStyle(TableStyle([
        ('TOPPADDING', (0,0),(-1,-1), 0),
        ('BOTTOMPADDING', (0,0),(-1,-1), 0),
        ('LEFTPADDING', (0,0),(-1,-1), 0),
        ('RIGHTPADDING', (0,0),(-1,-1), 0),
        ('LEFTPADDING', (1,0),(1,-1), 8),
        ('LEFTPADDING', (2,0),(2,-1), 8),
        ('VALIGN', (0,0),(-1,-1), 'TOP'),
    ]))
    story.append(ia_outer)
    story.append(sp(12))

    story.append(card([
        Paragraph('L\'essentiel à retenir', s_eyebrow),
        Paragraph(
            '<b>Utilise l\'IA pour aller 2x plus vite — pas pour éviter d\'apprendre.</b> '
            'Prépare tes entretiens avec Claude ou ChatGPT. '
            'Analyse les fiches de poste pour identifier les mots-clés. '
            'Comprends les sujets complexes avec NotebookLM. '
            'Mais reste l\'auteur de ta reconversion — l\'IA est un copilote, pas un pilote.',
            s_body),
    ], bg=C_CARAMEL_SOFT, border=C_CARAMEL, pad=12))
    story.append(PageBreak())

    # ─────────────────────────────────────────────────────────────────────────
    # PAGE 13 — CTA FINAL
    # ─────────────────────────────────────────────────────────────────────────
    story.append(Paragraph('Et maintenant ?', s_eyebrow))
    story.append(Paragraph('La prochaine passe, c\'est moi qui te la fais.', s_h1))
    story.append(HR())
    story.append(sp(6))
    story.append(Paragraph(
        'Tu as maintenant les 6 étapes. Ce qui suit, c\'est du concret. '
        'Voici comment continuer avec LaPasseTech.',
        s_body))
    story.append(sp(10))

    ctas = [
        ('01', 'Faire mon bilan gratuit',
         '10 questions pour confirmer ta direction et identifier '
         'tes compétences transférables vers le digital.',
         'lapassetech.fr/bilan'),
        ('02', 'Explorer les ressources',
         'Guides, fiches pratiques et pas-à-pas classés par thème — '
         'à appliquer dès ce soir.',
         'lapassetech.fr/ressources'),
        ('03', 'S\'abonner à la newsletter',
         '1 à 2 fois par semaine : un article ou une ressource actionnable. '
         'Sans bullshit, sans spam.',
         'lapassetech.fr'),
    ]
    for num, title, desc, url in ctas:
        t = Table([[
            Paragraph(f'<font color="{C_CARAMEL.hexval()}">{num}</font>',
                      S(f'CTAN{num}', fontName='Helvetica-Bold', fontSize=20,
                        textColor=C_CARAMEL, leading=24)),
            [Paragraph(title, s_body_strong),
             Paragraph(desc, s_body),
             Paragraph(f'→ {url}',
                       S(f'CTAURL{num}', fontName='Helvetica-Bold', fontSize=9,
                         textColor=C_CARAMEL, leading=13))],
        ]], colWidths=[36, TEXT_W - 38])
        t.setStyle(TableStyle([
            ('BACKGROUND', (0,0),(-1,-1), C_CREAM),
            ('BOX', (0,0),(-1,-1), 0.75, C_BORDER),
            ('TOPPADDING', (0,0),(-1,-1), 12),
            ('BOTTOMPADDING', (0,0),(-1,-1), 12),
            ('LEFTPADDING', (0,0),(-1,-1), 14),
            ('RIGHTPADDING', (0,0),(-1,-1), 14),
            ('VALIGN', (0,0),(-1,-1), 'TOP'),
        ]))
        story.append(t); story.append(sp(6))

    story.append(sp(8))

    # Prompts Gemini
    story.append(Paragraph('2 prompts pour démarrer avec l\'IA ce soir', s_h3))
    story.append(sp(4))
    prompts = [
        'Je veux me reconvertir en [métier]. J\'ai [X] ans d\'expérience en [secteur]. '
        'Quelles compétences transférables ai-je vers ce métier ?',
        'Explique-moi comment fonctionne la POEI pour quelqu\'un dans ma situation : '
        '[décris ta situation en 2 phrases]. Quelles sont mes premières démarches ?',
    ]
    for i, prompt_text in enumerate(prompts):
        story.append(card([
            Paragraph(f'Prompt {i+1} — Gemini / ChatGPT / Claude',
                      S(f'PromptLabel{i}', fontName='Helvetica-Bold', fontSize=8,
                        textColor=C_GRAY_LT, leading=11, spaceAfter=4)),
            Paragraph(f'<i>"{prompt_text}"</i>',
                      S(f'PromptText{i}', fontName='Helvetica-Oblique', fontSize=9.5,
                        textColor=C_INK, leading=14)),
        ], bg=C_BLACK, border=C_BLACK, pad=12))
        story.append(sp(5))

    story.append(sp(8))
    story.append(card([
        Paragraph('Réseaux sociaux',
                  S('RSH', fontName='Helvetica-Bold', fontSize=10,
                    textColor=C_GRAY_LT, leading=13, spaceAfter=6)),
        Table([[
            Paragraph('<b>LinkedIn</b> — linkedin.com/in/guygambo',
                      S('RS1', fontName='Helvetica-Bold', fontSize=10,
                        textColor=C_INK, leading=14)),
            Paragraph('<b>Instagram</b> — @lapassetech',
                      S('RS2', fontName='Helvetica-Bold', fontSize=10,
                        textColor=C_INK, leading=14)),
        ]], colWidths=[TEXT_W / 2 - 16, TEXT_W / 2 - 16]),
    ], bg=C_CREAM, border=C_BORDER, pad=12))
    story.append(PageBreak())

    # ─────────────────────────────────────────────────────────────────────────
    # PAGE 14 — 4e DE COUVERTURE (fond caramel pleine page via on_page)
    # ─────────────────────────────────────────────────────────────────────────
    # Le fond caramel est dessiné par LPTPageTemplate.on_page (back_cover_page=14)
    # Contenu : texte sur fond caramel transparent (no card bg)
    story.append(Spacer(1, H * 0.14))  # Espace en haut

    story.append(Paragraph(
        '<font color="#FAF8F5"><b>LaPasseTech</b></font>',
        S('BC_Logo', fontName='Helvetica-Bold', fontSize=30,
          textColor=C_CREAM_BG, leading=36, alignment=TA_CENTER, spaceAfter=6)))

    story.append(HRFlowable(width='70%', thickness=0.5,
                             color=HexColor('#C4844C'),
                             spaceAfter=20, spaceBefore=0,
                             hAlign='CENTER'))

    story.append(Paragraph(
        '<font color="#F2E2CC"><i>Rentrer dans le digital</i></font>',
        S('BC_T1', fontName='Helvetica-BoldOblique', fontSize=16,
          textColor=C_CARAMEL_SOFT, leading=22, alignment=TA_CENTER, spaceAfter=4)))
    story.append(Paragraph(
        '<font color="#F2E2CC"><i>sans le réseau, sans la grande école.</i></font>',
        S('BC_T2', fontName='Helvetica-Oblique', fontSize=14,
          textColor=C_CARAMEL_SOFT, leading=20, alignment=TA_CENTER, spaceAfter=4)))
    story.append(Paragraph(
        '<font color="#F2E2CC"><i>Sans bullshit, sans jargon, sans complexe.</i></font>',
        S('BC_T3', fontName='Helvetica-Oblique', fontSize=13,
          textColor=C_CARAMEL_SOFT, leading=19, alignment=TA_CENTER, spaceAfter=36)))

    story.append(HRFlowable(width='70%', thickness=0.5,
                             color=HexColor('#C4844C'),
                             spaceAfter=20, spaceBefore=0,
                             hAlign='CENTER'))

    story.append(Paragraph(
        '<font color="#FAF8F5"><b>lapassetech.fr</b></font>',
        S('BC_URL', fontName='Helvetica-Bold', fontSize=14,
          textColor=C_CREAM_BG, leading=19, alignment=TA_CENTER, spaceAfter=6)))
    story.append(Paragraph(
        '<font color="#F2E2CC">contact@lapassetech.fr</font>',
        S('BC_Email', fontName='Helvetica', fontSize=11,
          textColor=C_CARAMEL_SOFT, leading=16, alignment=TA_CENTER, spaceAfter=36)))

    story.append(Paragraph(
        '<font color="#D4A882">© 2026 LaPasseTech — Guide gratuit, diffusion libre</font>',
        S('BC_Copy', fontName='Helvetica', fontSize=9,
          textColor=HexColor('#D4A882'), leading=13, alignment=TA_CENTER)))

    # ── Build PDF ──────────────────────────────────────────────────────────────
    doc = SimpleDocTemplate(
        OUTPUT_PATH,
        pagesize=A4,
        leftMargin=MARGIN_H,
        rightMargin=MARGIN_H,
        topMargin=MARGIN_V,
        bottomMargin=22 * mm,
        title='Rentrer dans le digital sans le réseau, sans la grande école. — LaPasseTech',
        author='Guy Gambo — LaPasseTech',
        subject='Guide reconversion digitale — 6 étapes concrètes',
    )

    def on_first_page(canv, doc):
        draw_cover(canv)

    doc.build(story,
              onFirstPage=on_first_page,
              onLaterPages=tpl.on_page)

    print(f'PDF généré : {OUTPUT_PATH}')
    print(f'Taille : {os.path.getsize(OUTPUT_PATH) / 1024:.0f} Ko')

if __name__ == '__main__':
    build()
