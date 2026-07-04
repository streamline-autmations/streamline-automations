# Streamline asset pipeline -- source PNG/JPG -> resized WebP under public/assets
# Uses ffmpeg (libwebp). Re-runnable. Read-only on the source folder.
$ErrorActionPreference = 'Stop'
$SRC  = 'C:\Users\User\Desktop\Streamline\Social Media'
$REPO = 'C:\Users\User\Desktop\Streamline-Wesite\Streamline site -trae\streamline-site-main'
$DEST = Join-Path $REPO 'public\assets'

# role -> default width / quality
# columns: src (relative to SRC), out (relative to DEST, no ext), w (target width px; 0=logo longedge 600), q
$items = @(
  # ---- Streamline brand (raster mark; SVGs copied separately) ----
  @{src='Assets\logos\Untitled design (49).png';                                  out='logos\streamline-mark';            w=512; q=90},

  # ---- Client logos (transparent, long-edge 600) ----
  @{src='Assets\Blom\Logos\logo-trim.png';                                         out='clients\blom\logo';               w=0;   q=90},
  @{src='Assets\RecklessBear\Logos\wordmark-black-trim.png';                       out='clients\recklessbear\logo-word';  w=0;   q=90},
  @{src='Assets\RecklessBear\Logos\icon-black-trim.png';                           out='clients\recklessbear\logo-icon';  w=0;   q=90},
  @{src='Assets\CW-Electronics\Logos\logo-black-trim.png';                         out='clients\cw-electronics\logo';     w=0;   q=90},
  @{src='Assets\Ameli\Logos\logo.png';                                             out='clients\ameli\logo';              w=0;   q=90},
  @{src='Assets\JJ-Glass\Logos\logo-trim.png';                                     out='clients\jj-glass\logo';           w=0;   q=90},

  # ---- BLOM ----
  @{src='Assets\Blom\Mockups\BLOM Cosmetics Home Page Mockup.png';                 out='clients\blom\hero';               w=2000; q=82},
  # Full-bleed top-view mockup: crop-safe case cover for work cards + cycler
  @{src='Assets\Blom\Mockups\Blom-Top view mutliple screens.png';                  out='clients\blom\tile';               w=1200; q=80},
  @{src='Assets\Blom\Mockups\Blom-Top view mutliple screens.png';                  out='clients\blom\cover-wide';         w=1600; q=80; vf='scale=1600:-2,crop=1600:1000:(iw-1600)/2:(ih-1000)/2'},
  @{src='Assets\Blom\Mockups\BLOM Cosmetics Mockup 1.png';                         out='clients\blom\mockup-1';           w=1800; q=82},
  @{src='Assets\Blom\Mockups\Blom 3 phone Mcp.png';                                out='clients\blom\mockup-3phone';      w=1800; q=82},
  @{src='Assets\Blom-Academy\Mockups\3 phone-blom-academy.png';                    out='clients\blom\mockup-academy';     w=1800; q=82},
  @{src='Assets\Blom\Desktop\shop.png';                                            out='clients\blom\shop';               w=1600; q=82},
  @{src='Assets\Blom\Desktop\Batch-2\product-page.png';                            out='clients\blom\product';            w=1600; q=82},
  @{src='Assets\Blom\Desktop\Batch-2\home-categories.png';                         out='clients\blom\categories';         w=1600; q=82},
  @{src='Assets\Blom\Desktop\Batch-2\courses.png';                                 out='clients\blom\courses';            w=1600; q=82},
  @{src='Assets\Blom\Desktop\Batch-2\account.png';                                 out='clients\blom\account';            w=1600; q=82},
  @{src='Assets\Blom\Desktop\admin-analytics.png';                                 out='clients\blom\admin-analytics';    w=1600; q=82},
  @{src='Assets\Blom\Desktop\admin-edit-product.png';                              out='clients\blom\admin-edit';         w=1600; q=82},
  @{src='Assets\Blom\Desktop\admin-orders.png';                                    out='clients\blom\admin-orders';       w=1600; q=82},
  @{src='Assets\Blom\Desktop\academy-login.jpg';                                   out='clients\blom\academy-login';      w=1600; q=82},
  @{src='Assets\Blom\Desktop\academy-course-lesson.png';                           out='clients\blom\academy-lesson';     w=1600; q=82},
  @{src='Assets\Blom\Desktop\whatsapp-order-confirmation.png';                     out='clients\blom\whatsapp';           w=900;  q=84},
  @{src='Assets\Blom\Mobile\Shop-by-category.jpg';                                 out='clients\blom\mobile-shop';        w=720;  q=82},
  @{src='Assets\Blom\Mobile\academy-dashboard.jpeg';                               out='clients\blom\mobile-academy';     w=720;  q=82},

  # ---- RecklessBear ----
  @{src='Assets\RecklessBear\Mockups\Recklessbear-laptop-hero-transparent.png';    out='clients\recklessbear\hero';       w=2000; q=86},
  @{src='Assets\RecklessBear\Mockups\Reckless-Top view mutliple screens.png';      out='clients\recklessbear\tile';       w=1200; q=80},
  @{src='Assets\RecklessBear\Mockups\Reckless-Top view mutliple screens.png';      out='clients\recklessbear\cover-wide'; w=1600; q=80; vf='scale=1600:-2,crop=1600:1000:(iw-1600)/2:(ih-1000)/2'},
  @{src='Assets\RecklessBear\Mockups\Reckless Admin Multi Device.png';             out='clients\recklessbear\admin';      w=1900; q=82},
  @{src='Assets\RecklessBear\Mockups\3 phone reckless-home-chabot.png';            out='clients\recklessbear\mockup-3phone'; w=1800; q=82},
  @{src='Assets\RecklessBear\Desktop\New folder\home.jpg';                         out='clients\recklessbear\home';       w=1600; q=82},
  @{src='Assets\RecklessBear\Desktop\all-products.png';                            out='clients\recklessbear\all-products'; w=1600; q=82},
  @{src='Assets\RecklessBear\Desktop\product-page.png';                            out='clients\recklessbear\product';    w=1600; q=82},
  @{src='Assets\RecklessBear\Desktop\New folder\categories.png';                   out='clients\recklessbear\categories'; w=1600; q=82},
  @{src='Assets\RecklessBear\Desktop\chatbot-chat.png';                            out='clients\recklessbear\chatbot';    w=1600; q=82},
  @{src='Assets\RecklessBear\Desktop\forms.png';                                   out='clients\recklessbear\forms';      w=1600; q=82},
  @{src='Assets\RecklessBear\Mobile\Mcp Resize-phone\home.png';                    out='clients\recklessbear\mobile-home'; w=720; q=82},
  @{src='Assets\RecklessBear\Mobile\Mcp Resize-phone\product-page.png';            out='clients\recklessbear\mobile-product'; w=720; q=82},
  @{src='Assets\RecklessBear\Mobile\Mcp Resize-phone\contact.png';                 out='clients\recklessbear\mobile-contact'; w=720; q=82},

  # ---- CW Electronics ----
  @{src='Assets\CW-Electronics\Mockups\Untitled design (50).png';                  out='clients\cw-electronics\hero';     w=2000; q=82},
  @{src='Assets\CW-Electronics\Mockups\CW-1Top view mutliple screens.png';         out='clients\cw-electronics\tile';     w=1200; q=80},
  @{src='Assets\CW-Electronics\Mockups\CW-1Top view mutliple screens.png';         out='clients\cw-electronics\cover-wide'; w=1600; q=80; vf='scale=1600:-2,crop=1600:1000:(iw-1600)/2:(ih-1000)/2'},
  @{src='Assets\CW-Electronics\Desktop\Home-2.jpg';                                out='clients\cw-electronics\home-2';   w=1600; q=82},
  @{src='Assets\CW-Electronics\Desktop\Featured Categories.png';                   out='clients\cw-electronics\categories'; w=1600; q=82},
  @{src='Assets\CW-Electronics\Desktop\Shop.png';                                  out='clients\cw-electronics\shop';     w=1600; q=82},
  @{src='Assets\CW-Electronics\Desktop\Product_page.png';                          out='clients\cw-electronics\product';  w=1600; q=82},
  @{src='Assets\CW-Electronics\Mobile\Home.jpeg';                                  out='clients\cw-electronics\mobile-home'; w=620; q=82},
  @{src='Assets\CW-Electronics\Mobile\Product-Details.jpeg';                       out='clients\cw-electronics\mobile-product'; w=620; q=82},
  @{src='Assets\CW-Electronics\Mobile\Categories.jpeg';                            out='clients\cw-electronics\mobile-categories'; w=620; q=82},

  # ---- Ameli ----
  @{src='Assets\Ameli\Mockups\Ameli Portfolio Mockup 2.png';                       out='clients\ameli\hero';              w=2000; q=82},
  @{src='Assets\Ameli\Mockups\Top view mutliple screens.png';                      out='clients\ameli\tile';              w=1200; q=80},
  @{src='Assets\Ameli\Mockups\Top view mutliple screens.png';                      out='clients\ameli\cover-wide';        w=1600; q=80; vf='scale=1600:-2,crop=1600:1000:(iw-1600)/2:(ih-1000)/2'},
  @{src='Assets\Ameli\Mockups\ameli 4 iphone.png';                                 out='clients\ameli\mockup-4iphone';    w=1900; q=82},
  @{src='Assets\Ameli\Mockups\Ameli Portfolio Mockup 1.png';                       out='clients\ameli\mockup-1';          w=1800; q=82},
  @{src='Assets\Ameli\Desktop\Screenshots\my-work.jpg';                            out='clients\ameli\my-work';           w=1600; q=82},
  @{src='Assets\Ameli\Desktop\Screenshots\project-jimmys.jpg';                     out='clients\ameli\jimmys';            w=1600; q=82},
  @{src='Assets\Ameli\Desktop\Screenshots\project-extra-chew-good.jpg';            out='clients\ameli\extra';             w=1600; q=82},
  @{src='Assets\Ameli\Desktop\new batch\portfolio.png';                            out='clients\ameli\portfolio';         w=1600; q=82},
  @{src='Assets\Ameli\Desktop\contact.png';                                        out='clients\ameli\contact';           w=1600; q=82},
  @{src='Assets\Ameli\Mobile\Ameli-Photos\home.png';                               out='clients\ameli\mobile-home';       w=720; q=82},
  @{src='Assets\Ameli\Mobile\Ameli-Photos\about-me.png';                           out='clients\ameli\mobile-about';      w=720; q=82},
  @{src='Assets\Ameli\Mobile\Ameli-Photos\project-habitat.png';                    out='clients\ameli\mobile-habitat';    w=720; q=82},

  # ---- JJ Glassworks (grid tile only) ----
  @{src='Assets\JJ-Glass\Desktop\Home.png';                                        out='clients\jj-glass\hero';           w=1600; q=82},
  # 16/10 centre-crop of the top-view mockup — the More-work card renders 16/10
  @{src='Assets\JJ-Glass\Mockups\JJ-GlassTop view mutliple screens.png';           out='clients\jj-glass\tile';           w=1600; q=80; vf='scale=1600:-2,crop=1600:1000:(iw-1600)/2:(ih-1000)/2'},
  @{src='Assets\JJ-Glass\Mobile\MCP Size\home.png';                                out='clients\jj-glass\mobile-home';    w=620; q=82},

  # ---- About / founder ----
  @{src='Assets\photos\founder-full.jpeg';                                         out='about\founder';                   w=1200; q=84},
  @{src='Assets\photos\founder-headshot.jpeg';                                     out='about\founder-headshot';          w=600;  q=84}
)

$results = @()
$fail = @()
foreach ($it in $items) {
  $inPath  = Join-Path $SRC  $it.src
  $outPath = (Join-Path $DEST $it.out) + '.webp'
  if (-not (Test-Path $inPath)) { $fail += "MISSING SRC: $($it.src)"; continue }
  $outDir = Split-Path $outPath -Parent
  if (-not (Test-Path $outDir)) { New-Item -ItemType Directory -Force -Path $outDir | Out-Null }

  if ($it.ContainsKey('vf')) {
    $vf = $it.vf
  } elseif ($it.w -eq 0) {
    $vf = "scale='min(600,iw)':'min(600,ih)':force_original_aspect_ratio=decrease"
  } else {
    $vf = "scale='min($($it.w),iw)':-2"
  }
  $args = @('-y','-loglevel','error','-i', $inPath, '-vf', $vf, '-frames:v','1','-c:v','libwebp','-quality', "$($it.q)", '-compression_level','6','-an', $outPath)
  & ffmpeg @args
  if ($LASTEXITCODE -ne 0 -or -not (Test-Path $outPath)) { $fail += "FFMPEG FAIL: $($it.out)"; continue }

  $dim = & ffprobe -v error -select_streams v:0 -show_entries stream=width,height -of csv=p=0 $outPath
  $kb  = [math]::Round((Get-Item $outPath).Length/1KB,0)
  $results += [pscustomobject]@{ out=($it.out + '.webp'); dims=$dim; KB=$kb }
}

# Copy brand SVGs verbatim
$svgMap = @(
  @{s='_Archive\Final logos\SVG\Asset 10.svg'; d='logos\streamline-mark.svg'},
  @{s='_Archive\Final logos\SVG\Name.svg';     d='logos\streamline-wordmark.svg'}
)
foreach ($m in $svgMap) {
  $sp = Join-Path $SRC $m.s; $dp = Join-Path $DEST $m.d
  if (Test-Path $sp) { Copy-Item $sp $dp -Force; $results += [pscustomobject]@{ out=$m.d; dims='vector'; KB=[math]::Round((Get-Item $dp).Length/1KB,1) } }
  else { $fail += "MISSING SVG: $($m.s)" }
}

"==== CONVERTED: $($results.Count) ===="
$results | Sort-Object out | Format-Table -AutoSize | Out-String -Width 200
"==== FAILURES: $($fail.Count) ===="
$fail | ForEach-Object { $_ }
"==== TOTAL SIZE ===="
"{0:N1} MB" -f (($results | Measure-Object KB -Sum).Sum/1024)
"==== HEAVY (>300KB) -- Cloudinary candidates ===="
$results | Where-Object { $_.KB -gt 300 } | Sort-Object KB -Descending | Format-Table -AutoSize | Out-String -Width 200