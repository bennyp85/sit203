<?xml version="1.0" encoding="ISO-8859-1"?>
<xsl:stylesheet version="1.0"
xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:output method="html" />

<xsl:param name="productID"/>
<xsl:param name="sortValue"/>


<xsl:template match="/">

	<xsl:for-each select="PRODUCTS/*/*[@id = $productID]">

		<div class="row" id="productMain">
			<div class="col-sm-6">
                <div id="mainImage">
					<img alt="NoImage" class="img-responsive mycenter" style = "width: 300px; height: 300px">
						<xsl:attribute name="src">
						<xsl:text>img/</xsl:text>
						<xsl:value-of select="IMAGE1"/>
						</xsl:attribute>
					</img>
                </div>
            </div>
            <div class="col-sm-6">
				<div class="box">
					<h1 class="text-center"><xsl:value-of select="NAME"/></h1>
					<p class="goToDescription"><a href="#details" class="scroll-to">Scroll to product details, material and care </a>
					</p>
					<p class="price">$<xsl:value-of select="PRICE"/></p>
					<p class="text-center buttons">
					<a class="btn btn-primary">

						<xsl:attribute name="href">basket.php?action=add&amp;id=<xsl:value-of select="$productID"/>
						</xsl:attribute>
						<!-- save to session -->

						<i class="fa fa-shopping-cart"></i> Add to cart</a>
					</p>
				</div>
			</div>

			<div class="box" id="details">
				<p>
                <h4>Product details</h4>
                <p><xsl:value-of select="DETAILS"/></p>
                <h4>Material and care</h4>
                <ul>
                    <li><xsl:value-of select="MATERIAL"/></li>
                </ul>
                <blockquote>
                <p><em><xsl:value-of select="CARE"/></em>
                </p>
                </blockquote>
				</p>
				<hr/>
                <div class="social">
                    <h4>Show it to your friends</h4>
                    <p>
                    <a href="#" class="external facebook" data-animate-hover="pulse"><i class="fa fa-facebook"></i></a>
                    <a href="#" class="external gplus" data-animate-hover="pulse"><i class="fa fa-google-plus"></i></a>
                    <a href="#" class="external twitter" data-animate-hover="pulse"><i class="fa fa-twitter"></i></a>
                    <a href="#" class="email" data-animate-hover="pulse"><i class="fa fa-envelope"></i></a>
                    </p>
                </div>
            </div>
		</div>

	</xsl:for-each>

</xsl:template>
</xsl:stylesheet>
