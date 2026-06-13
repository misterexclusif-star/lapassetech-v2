"""
3 propositions de couverture pour le guide LaPasseTech PDF.
Sortie : email-templates/cover-proposals.pdf (3 pages, une par variante)

V1 — Fond caramel/marron (chaud, signature marque)
V2 — Fond crème/beige (éditorial propre, haut de gamme)
V3 — Fond photo simulé + filtre caramel semi-transparent (comme le carrousel Instagram)
"""
from reportlab.pdfgen.canvas import Canvas
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib.colors import HexColor
import os, math

W, H = A4
MH = 14 * mm   # marge horizontal
MV = 14 * mm   # marge vertical

# ── Tokens couleur ────────────────────────────────────────────────────────────
C_CARAMEL      = HexColor('#9C5A2C')
C_CARAM_DEEP   = HexColor('#5C2E10')
C_CARAM_MID    = HexColor('#7A4420')
C_CARAM_SOFT   = HexColor('#F2E2CC')
C_CARAM_PALE   = HexColor('#D4A882')
C_GREEN        = HexColor('#16B877')
C_YELLOW       = HexColor('#F5C542')
C_INK          = HexColor('#2A2520')
C_BLACK        = HexColor('#1A1714')
C_GRAY         = HexColor('#6B655D')
C_GRAY_LT      = HexColor('#9A9388')
C_GRAY_LIGHT   = HexColor('#B5AE9F')
C_PAPER        = HexColor('#FFFFFF')
C_CREAM        = HexColor('#F8F4EB')
C_BEIGE        = HexColor('#EFE6D2')
C_BORDER       = HexColor('#E5DDC9')

# ── Helpers ───────────────────────────────────────────────────────────────────
def badge_pill(c, x, y, text, w, h=22, bg=C_CARAMEL, fg=C_PAPER, fs=9.5):
    r = h / 2
    c.setFillColor(bg)
    c.roundRect(x, y, w, h, r, fill=1, stroke=0)
    c.setFillColor(fg)
    c.setFont('Helvetica-Bold', fs)
    c.drawCentredString(x + w / 2, y + 7, text)

def label_eyebrow(c, x, y, text, color=C_CARAMEL, fs=9, tracking=True):
    c.setFillColor(color)
    c.setFont('Helvetica-Bold', fs)
    c.drawString(x, y, text)
    if tracking:
        c.setStrokeColor(color)
        c.setLineWidth(0.8)
        c.line(x, y - 4, x + 36, y - 4)

def author_block(c, x, y, name_color=C_CREAM, sub_color=C_GRAY_LT, fs=13):
    c.setFillColor(name_color)
    c.setFont('Helvetica-Bold', fs)
    c.drawString(x, y, 'Guy Gambo')
    c.setFillColor(sub_color)
    c.setFont('Helvetica', 10)
    c.drawString(x, y - 14, 'Fondateur · LaPasseTech')
    c.drawString(x, y - 27, 'Business Analyst Salesforce reconverti')

def wordmark(c, x, y, color=C_CREAM, right_label='GUIDE PDF  ·  2026'):
    c.setFillColor(color)
    c.setFont('Helvetica-Bold', 16)
    c.drawString(x, y, 'LaPasseTech')
    if right_label:
        c.setFillColor(C_GRAY_LT)
        c.setFont('Helvetica', 9)
        c.drawRightString(W - MH, y, right_label)

def title_block(c, x, y, title_color=C_CREAM, accent_color=C_CARAM_SOFT,
                sub_color=C_GRAY_LT, t1_size=44, t2_size=34):
    """Dessine le bloc titre standard."""
    c.setFillColor(title_color)
    c.setFont('Helvetica-Bold', t1_size)
    c.drawString(x, y + 44, 'Les 8 métiers')
    c.drawString(x, y, 'du digital')
    c.setFillColor(accent_color)
    c.setFont('Helvetica-BoldOblique', t2_size)
    c.drawString(x, y - 44, 'accessibles sans coder.')
    c.setFillColor(sub_color)
    c.setFont('Helvetica', 11.5)
    c.drawString(x, y - 72,
                 'Le guide honnête pour choisir ta reconversion dans le digital')


# ══════════════════════════════════════════════════════════════════════════════
# V1 — FOND CARAMEL/MARRON
# ══════════════════════════════════════════════════════════════════════════════
def draw_v1(c):
    # ── Fond pleine page caramel ──────────────────────────────────────────────
    c.setFillColor(C_CARAMEL)
    c.rect(0, 0, W, H, fill=1, stroke=0)

    # ── Bloc gauche chocolat foncé (38% largeur) ─────────────────────────────
    block_w = W * 0.38
    c.setFillColor(C_CARAM_DEEP)
    c.rect(0, 0, block_w, H, fill=1, stroke=0)

    # ── Texture diagonale sur le fond caramel droite ──────────────────────────
    c.saveState()
    c.setStrokeColor(HexColor('#8A4E24'))
    c.setLineWidth(0.5)
    for i in range(-20, 50):
        x0 = block_w + i * 20
        c.line(x0, 0, x0 + H, H)
    c.restoreState()

    # ── Grand "8" décoratif semi-visible ─────────────────────────────────────
    c.saveState()
    c.setFillColor(HexColor('#8A4E24'))
    c.setFont('Helvetica-Bold', 460)
    c.drawString(W * 0.28, -44, '8')
    c.restoreState()

    # ── Bande top ─────────────────────────────────────────────────────────────
    c.setFillColor(C_YELLOW)
    c.rect(0, H - 3.5 * mm, W, 3.5 * mm, fill=1, stroke=0)

    # ── Lignes rhythmiques horizontales (crème fin) ───────────────────────────
    c.setStrokeColor(HexColor('#D4A882'))
    c.setLineWidth(0.4)
    for y_frac in [0.82, 0.64, 0.38]:
        c.line(block_w + 8, H * y_frac, W - MH, H * y_frac)

    # ── Logo / wordmark ───────────────────────────────────────────────────────
    wordmark(c, MH + 10, H - MV - 8, color=C_CREAM, right_label='GUIDE PDF  ·  2026')

    # ── Label numéro de version sur bloc gauche ───────────────────────────────
    c.saveState()
    c.translate(block_w / 2, H * 0.65)
    c.rotate(90)
    c.setFillColor(C_CARAM_PALE)
    c.setFont('Helvetica-Bold', 8)
    c.drawCentredString(0, 0, 'RECONVERSION  ·  DIGITAL  ·  SANS CODER')
    c.restoreState()

    # ── Eyebrow + titre ───────────────────────────────────────────────────────
    tx = block_w + 14 * mm
    ty = H * 0.545
    label_eyebrow(c, tx, ty + 90, 'LE GUIDE', color=C_YELLOW)
    title_block(c, tx, ty,
                title_color=C_CREAM, accent_color=C_CARAM_SOFT,
                sub_color=C_CARAM_PALE, t1_size=44, t2_size=34)

    # ── Séparateur ───────────────────────────────────────────────────────────
    c.setStrokeColor(C_CARAM_MID)
    c.setLineWidth(0.75)
    c.line(tx, H * 0.245, W - MH, H * 0.245)

    # ── Bloc auteur (sur fond chocolate) ─────────────────────────────────────
    author_block(c, MH + 10, H * 0.185,
                 name_color=C_CREAM, sub_color=C_CARAM_PALE)

    # ── Badge pill ───────────────────────────────────────────────────────────
    badge_pill(c, tx, H * 0.09, 'Guide gratuit  ·  21 pages',
               w=164, h=22, bg=C_YELLOW, fg=C_BLACK)

    # ── Label version (bas gauche) ────────────────────────────────────────────
    c.setFillColor(C_CARAM_PALE)
    c.setFont('Helvetica', 8.5)
    c.drawString(MH + 10, MV + 6, 'V1 — FOND CARAMEL')


# ══════════════════════════════════════════════════════════════════════════════
# V2 — FOND CRÈME / ÉDITORIAL
# ══════════════════════════════════════════════════════════════════════════════
def draw_v2(c):
    # ── Fond crème plein ─────────────────────────────────────────────────────
    c.setFillColor(C_CREAM)
    c.rect(0, 0, W, H, fill=1, stroke=0)

    # ── Bloc header sombre (48% hauteur en haut) ──────────────────────────────
    dark_h = H * 0.48
    c.setFillColor(C_BLACK)
    c.rect(0, H - dark_h, W, dark_h, fill=1, stroke=0)

    # ── Bande caramel top ─────────────────────────────────────────────────────
    c.setFillColor(C_CARAMEL)
    c.rect(0, H - 3.5 * mm, W, 3.5 * mm, fill=1, stroke=0)

    # ── Texture subtile sur fond crème (pointillés) ───────────────────────────
    c.saveState()
    c.setFillColor(C_BORDER)
    dot_spacing = 18
    for xi in range(int(W / dot_spacing) + 1):
        for yi in range(int(H * 0.52 / dot_spacing) + 1):
            px = xi * dot_spacing
            py = yi * dot_spacing
            if py < H * 0.49:
                c.circle(px, py, 1, fill=1, stroke=0)
    c.restoreState()

    # ── Grand "8" fantôme sur fond sombre ────────────────────────────────────
    c.saveState()
    c.setFillColor(HexColor('#26201A'))
    c.setFont('Helvetica-Bold', 440)
    c.drawString(W * 0.18, H * 0.22, '8')
    c.restoreState()

    # ── Wordmark (en blanc sur fond sombre) ──────────────────────────────────
    wordmark(c, MH, H - MV - 8, color=C_CREAM, right_label='GUIDE PDF  ·  2026')

    # ── Titre — positionné sur la zone sombre ────────────────────────────────
    tx = MH
    ty = H * 0.565

    # Eyebrow discret
    label_eyebrow(c, tx, ty + 92, 'LE GUIDE', color=C_CARAMEL, tracking=True)

    # Titre lignes 1 & 2 en blanc (zone sombre)
    c.setFillColor(C_CREAM)
    c.setFont('Helvetica-Bold', 48)
    c.drawString(tx, ty + 46, 'Les 8 métiers')
    c.drawString(tx, ty, 'du digital')

    # "accessibles sans coder." — traverse la frontière sombre/clair
    # Le texte est en caramel et traverse les deux zones
    c.setFillColor(C_CARAMEL)
    c.setFont('Helvetica-BoldOblique', 37)
    c.drawString(tx, ty - 48, 'accessibles sans coder.')

    # Sous-titre — zone crème, texte encre
    c.setFillColor(C_GRAY)
    c.setFont('Helvetica', 11.5)
    c.drawString(tx, ty - 78,
                 'Le guide honnête pour choisir ta reconversion dans le digital')

    # ── Barre horizontale caramel (séparateur zone crème) ────────────────────
    c.setStrokeColor(C_BORDER)
    c.setLineWidth(0.75)
    c.line(tx, H * 0.265, W - MH, H * 0.265)

    # ── Bloc auteur (zone crème, texte sombre) ────────────────────────────────
    author_block(c, tx, H * 0.205, name_color=C_INK, sub_color=C_GRAY)

    # ── Badge pill ───────────────────────────────────────────────────────────
    badge_pill(c, tx, H * 0.092, 'Guide gratuit  ·  21 pages',
               w=164, h=22, bg=C_CARAMEL, fg=C_PAPER)

    # ── Accent barre verticale caramel (right, décoratif) ─────────────────────
    c.setFillColor(C_CARAMEL)
    c.rect(W - MH - 4, H * 0.3, 4, H * 0.18, fill=1, stroke=0)

    # ── Label version ────────────────────────────────────────────────────────
    c.setFillColor(C_GRAY_LIGHT)
    c.setFont('Helvetica', 8.5)
    c.drawString(MH, MV - 2, 'V2 — FOND CREME / EDITORIAL')


# ══════════════════════════════════════════════════════════════════════════════
# V3 — IMAGE SIMULÉE + FILTRE CARAMEL (style carrousel Instagram)
# ══════════════════════════════════════════════════════════════════════════════
def draw_v3(c):
    # ── 1. Fond de base chaud ─────────────────────────────────────────────────
    c.setFillColor(HexColor('#C8A882'))
    c.rect(0, 0, W, H, fill=1, stroke=0)

    # ── 2. Simuler une scène "portrait en intérieur" avec des formes chaudes ──
    # Arrière-plan abstrait : formes organiques en dégradé chaud

    # Zone lumineuse haute (fenêtre / lumière)
    c.saveState()
    c.setFillColor(HexColor('#E8D0B0'))
    c.ellipse(W * 0.55, H * 0.65, W * 1.1, H * 1.05, fill=1, stroke=0)
    c.restoreState()

    # Zone centrale (figure / personnage)
    c.saveState()
    c.setFillColor(HexColor('#8B6040'))
    # Corps/silhouette centrale
    c.ellipse(W * 0.2, H * 0.15, W * 0.82, H * 0.88, fill=1, stroke=0)
    c.restoreState()

    # Halo lumineux autour du visage
    c.saveState()
    c.setFillColor(HexColor('#D4A870'))
    c.ellipse(W * 0.28, H * 0.52, W * 0.74, H * 0.95, fill=1, stroke=0)
    c.restoreState()

    # Ombre côté gauche
    c.saveState()
    c.setFillColor(HexColor('#5A3820'))
    c.rect(0, 0, W * 0.22, H, fill=1, stroke=0)
    c.restoreState()

    # Ombre bas
    c.saveState()
    c.setFillColor(HexColor('#4A2E18'))
    c.rect(0, 0, W, H * 0.18, fill=1, stroke=0)
    c.restoreState()

    # Quelques touches lumière
    c.saveState()
    c.setFillColor(HexColor('#E8C898'))
    c.ellipse(W * 0.38, H * 0.55, W * 0.65, H * 0.82, fill=1, stroke=0)
    c.restoreState()

    # ── 3. Filtre caramel semi-transparent (comme un overlay Instagram) ───────
    c.saveState()
    c.setFillColor(C_CARAMEL)
    c.setFillAlpha(0.58)
    c.rect(0, 0, W, H, fill=1, stroke=0)
    c.restoreState()

    # ── 4. Grain/bruit léger pour texture photo ───────────────────────────────
    c.saveState()
    c.setFillColor(HexColor('#000000'))
    import random
    random.seed(42)
    c.setFillAlpha(0.03)
    for _ in range(2200):
        px = random.uniform(0, W)
        py = random.uniform(0, H)
        c.circle(px, py, 0.6, fill=1, stroke=0)
    c.restoreState()

    # ── 5. Bande dégradée bas (vignette sombre) ───────────────────────────────
    c.saveState()
    # Dégradé simulé avec plusieurs rects de plus en plus opaques
    n_steps = 12
    for i in range(n_steps):
        alpha = (i / n_steps) * 0.65
        h_frac = (i / n_steps) * H * 0.38
        c.setFillColor(C_CARAM_DEEP)
        c.setFillAlpha(alpha * 0.7)
        step_h = H * 0.38 / n_steps
        c.rect(0, h_frac, W, step_h + 1, fill=1, stroke=0)
    c.restoreState()

    # ── 6. Bande dégradée haut ────────────────────────────────────────────────
    c.saveState()
    n_steps = 8
    for i in range(n_steps):
        alpha = ((n_steps - i) / n_steps) * 0.45
        y_top = H - (i / n_steps) * H * 0.30
        c.setFillColor(C_CARAM_DEEP)
        c.setFillAlpha(alpha * 0.8)
        c.rect(0, y_top, W, H * 0.30 / n_steps + 1, fill=1, stroke=0)
    c.restoreState()

    # Reset alpha
    c.setFillAlpha(1.0)

    # ── 7. UI texte — style carrousel magazine ────────────────────────────────

    # Bande top jaune (logo)
    c.setFillColor(C_YELLOW)
    c.rect(0, H - 3.5 * mm, W, 3.5 * mm, fill=1, stroke=0)

    # Wordmark
    wordmark(c, MH, H - MV - 8, color=C_CREAM, right_label='GUIDE PDF  ·  2026')

    # Eyebrow tracking type style magazine
    c.setFillColor(C_CREAM)
    c.setFont('Helvetica-Bold', 8.5)
    eyebrow_text = 'RECONVERSION  SANS  BULLSHIT'
    c.drawString(MH, H * 0.71, eyebrow_text)

    # Ligne caramel sous eyebrow
    ew = len(eyebrow_text) * 5.2
    c.setStrokeColor(C_YELLOW)
    c.setLineWidth(1.5)
    c.line(MH, H * 0.71 - 5, MH + ew, H * 0.71 - 5)

    # Titre très grand, style carrousel
    tx = MH
    ty = H * 0.44

    c.setFillColor(C_PAPER)
    c.setFont('Helvetica-Bold', 56)
    c.drawString(tx, ty + 40, 'Les 8')

    c.setFillColor(C_PAPER)
    c.setFont('Helvetica-Bold', 46)
    c.drawString(tx, ty - 12, 'métiers')

    c.setFillColor(C_CARAM_SOFT)
    c.setFont('Helvetica-BoldOblique', 30)
    c.drawString(tx, ty - 50, 'du digital accessibles sans coder.')

    # Barre verticale gauche accent (jaune, style carrousel LaPasseTech)
    c.setFillColor(C_YELLOW)
    c.rect(MH - 4, ty - 66, 3, 130, fill=1, stroke=0)

    # Sous-titre
    c.setFillColor(C_CARAM_SOFT)
    c.setFont('Helvetica', 11.5)
    c.drawString(tx, ty - 76,
                 'Le guide honnête pour ta reconversion dans le digital')

    # ── 8. Badge + auteur (zone bas) ─────────────────────────────────────────
    badge_pill(c, MH, H * 0.105, 'Guide gratuit  ·  21 pages',
               w=164, h=22, bg=C_YELLOW, fg=C_BLACK)

    author_block(c, MH, H * 0.19,
                 name_color=C_PAPER, sub_color=C_CARAM_SOFT)

    # ── 9. Swipe hint style Instagram ────────────────────────────────────────
    c.setFillColor(C_CREAM)
    c.setFont('Helvetica', 9)
    c.drawString(MH, MV + 8, '← swipe pour parcourir le guide')

    # ── Label version ────────────────────────────────────────────────────────
    c.setFillColor(C_CARAM_SOFT)
    c.setFont('Helvetica', 8.5)
    c.drawRightString(W - MH, MV - 2, 'V3 — IMAGE + FILTRE CARAMEL')


# ── Main ──────────────────────────────────────────────────────────────────────
def main():
    out = os.path.join(os.path.dirname(__file__), 'cover-proposals.pdf')
    c = Canvas(out, pagesize=A4)

    draw_v1(c);  c.showPage()
    draw_v2(c);  c.showPage()
    draw_v3(c);  c.save()

    print(f'Propositions : {out}')
    print(f'Taille : {os.path.getsize(out) / 1024:.0f} Ko')

if __name__ == '__main__':
    main()
