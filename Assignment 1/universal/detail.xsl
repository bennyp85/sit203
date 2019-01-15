<?xml version="1.0" encoding="UTF-8"?>

<xsl:stylesheet version="1.0"
xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:param name = "product"/>
<xsl:template match="/">
  <html>
  <body>
    <div class="col-md-9">
        <div class="row" id="productMain">
            <div class="col-sm-6">
                <div id="mainImage">
                    <img src="img/detailbig1.jpg" alt="" class="img-responsive"><xsl:value-of select="catalog/furniture/*/img1"/></img>
                </div>

            </div>
            <div class="col-sm-6">
                <div class="box">
                  <p></p>
                    <h1 class="text-center"><xsl:value-of select="$product"/></h1>


                    <p class="goToDescription"><a href="#details" class="scroll-to">Scroll to product details, material and care </a>
                    </p>
                    <p class="price"><xsl:value-of select="catalog/furniture/*/price"/></p>

                    <p class="text-center buttons">
                        <a href="basket.html" class="btn btn-primary"><i class="fa fa-shopping-cart"></i> Add to cart</a>

                    </p>

                </div>

            </div>

        </div>

        <div class="box" id="details">
            <p>
                <h4>Product details</h4>
                <p><xsl:value-of select="catalog/furniture/*/details"/></p>
                <h4>Material and care</h4>
                <p><xsl:value-of select="catalog/furniture/*/material_care"/></p>


                <!-- <blockquote>
                    <p><em><xsl:value-of select="material_care"/></em>
                    </p>
                </blockquote> -->

                <hr>
                <div class="social">
                    <h4>Show it to your friends</h4>
                    <p>
                        <a href="#" class="external facebook" data-animate-hover="pulse"><i class="fa fa-facebook"></i></a>
                        <a href="#" class="external gplus" data-animate-hover="pulse"><i class="fa fa-google-plus"></i></a>
                        <a href="#" class="external twitter" data-animate-hover="pulse"><i class="fa fa-twitter"></i></a>
                        <a href="#" class="email" data-animate-hover="pulse"><i class="fa fa-envelope"></i></a>
                    </p>
                </div>
              </hr>
            </p>
        </div>
      </div>
  </body>
  </html>
</xsl:template>
</xsl:stylesheet>
