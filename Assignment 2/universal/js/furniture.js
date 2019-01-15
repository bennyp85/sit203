		var xmlDoc = "";				
		var FILTERBY = 'FURNITURE';
		var brandFilters = new Brands('true','true','true','true','true');
		var TotalItemsToDisplay = 0;
		var CurrentDisplayedPage = 1;		
		var PageDivisor = 6;
		
		// Create a Brands Object to be used to track which brands to show.
		// Accepts 5 paramaters, each represents a brand. True to display, False to hide.
		function Brands (Brand1, Brand2, Brand3, Brand4, Brand5)
		{			
			this.Universal = Brand1;
			this.Ikea = Brand2;
			this.Factory = Brand3;
			this.Fantastic = Brand4;
			this.Artdeco = Brand5;
		}
				
		// Load the XML File.
		// Accepts 1 paramater, the filename to load.
		function loadXMLDoc(filename)
		{			
			if (window.ActiveXObject)
				xhttp = new ActiveXObject("Msxml2.XMLHTTP");	  
			else
				xhttp = new XMLHttpRequest();		
			xhttp.open ("GET", filename, false);
			try {xhttp.responseType = "msxml-document"} catch(err) {}
			xhttp.send();
			return xhttp.responseXML;					
		}

		// Tranverse the XML Document and populate and array of item objects, based on a catergory filter.	
		function FilterBasedOnCatergory() 
		{
			// Create an Object to hold each item to be displayed.
			function anItem(aName, aPrice, aFrontImage, aBackImage, aBrand, aId)  {this.Name= aName;																			  
																		      this.Price= aPrice;
																			  this.FrontImage= aFrontImage;
																			  this.BackImage= aBackImage;
																			  this.Brand = aBrand;
																			  this.Id = aId}
			
			// Constant variables used to transverse the loaded XML DOM.
			var catergories = ["CHAIR", "BED", "TABLE", "STORAGE"];
			var ITEMNAME = 1;			
			var ITEMPRICE = 3;
			var ITEMDETAILS = 5;
			var ITEMMATERIALS = 7;
			var ITEMFRONTIMAGE = 9;
			var ITEMBACKIMAGE = 11;
			var ITEMBRAND = 13;
			var listOfProducts = "";   // Used to hold results from Filtering XML DOM.
			var listItemsToDisplay = [];
			var index = 0;
			
			// FILTERBY used to determine catergory selection. 'FURNITURE', special case. Needs to show all furniture
			// Need to cycle through all catergories. Then fill array with objects to display
			if (FILTERBY == 'FURNITURE')
			{
				for (var count = 0; count < catergories.length; count++)
				{
					listOfProducts = xmlDoc.getElementsByTagName(catergories[count]);
					
					for (var itemCount = 0; itemCount < listOfProducts.length; itemCount++)
					{
				
						index = GetInsertIndex(listItemsToDisplay, listOfProducts[itemCount].childNodes[ITEMPRICE].childNodes[0].nodeValue);				
						if (index == -1)
							listItemsToDisplay.push(new anItem(listOfProducts[itemCount].childNodes[ITEMNAME].childNodes[0].nodeValue,
														listOfProducts[itemCount].childNodes[ITEMPRICE].childNodes[0].nodeValue,listOfProducts[itemCount].childNodes[ITEMFRONTIMAGE].childNodes[0].nodeValue,
														listOfProducts[itemCount].childNodes[ITEMBACKIMAGE].childNodes[0].nodeValue, listOfProducts[itemCount].childNodes[ITEMBRAND].childNodes[0].nodeValue,listOfProducts[itemCount].attributes[0].nodeValue));				
						else
						// Splice Method:- https://www.w3schools.com/jsref/jsref_splice.asp
						listItemsToDisplay.splice(index,0,new anItem(listOfProducts[itemCount].childNodes[ITEMNAME].childNodes[0].nodeValue,
														listOfProducts[itemCount].childNodes[ITEMPRICE].childNodes[0].nodeValue,listOfProducts[itemCount].childNodes[ITEMFRONTIMAGE].childNodes[0].nodeValue,
														listOfProducts[itemCount].childNodes[ITEMBACKIMAGE].childNodes[0].nodeValue,listOfProducts[itemCount].childNodes[ITEMBRAND].childNodes[0].nodeValue,listOfProducts[itemCount].attributes[0].nodeValue));					
					}
				}			
			}
			
			// Filter based on catergory selected. Then fill array with objects to display.
			else
			{
				listOfProducts = xmlDoc.getElementsByTagName(FILTERBY);											
				for (var itemCount = 0; itemCount < listOfProducts.length; itemCount++)
				{
					// Determine the index of the new object based on its price. Items will be inserted from lowest to highest.
					index = GetInsertIndex(listItemsToDisplay, listOfProducts[itemCount].childNodes[ITEMPRICE].childNodes[0].nodeValue);
				
					if (index == -1)   // Deal with the conditions of an empty array, or no price higher. Needs to be inserted at the start of array.
						listItemsToDisplay.push(new anItem(listOfProducts[itemCount].childNodes[ITEMNAME].childNodes[0].nodeValue,
														listOfProducts[itemCount].childNodes[ITEMPRICE].childNodes[0].nodeValue,listOfProducts[itemCount].childNodes[ITEMFRONTIMAGE].childNodes[0].nodeValue,
														listOfProducts[itemCount].childNodes[ITEMBACKIMAGE].childNodes[0].nodeValue, listOfProducts[itemCount].childNodes[ITEMBRAND].childNodes[0].nodeValue,listOfProducts[itemCount].attributes[0].nodeValue));	
				
					else  // Make room for a new object in the array and insert.
					// Splice Method:- https://www.w3schools.com/jsref/jsref_splice.asp
					listItemsToDisplay.splice(index,0,new anItem(listOfProducts[itemCount].childNodes[ITEMNAME].childNodes[0].nodeValue,
														listOfProducts[itemCount].childNodes[ITEMPRICE].childNodes[0].nodeValue,listOfProducts[itemCount].childNodes[ITEMFRONTIMAGE].childNodes[0].nodeValue,
														listOfProducts[itemCount].childNodes[ITEMBACKIMAGE].childNodes[0].nodeValue,listOfProducts[itemCount].childNodes[ITEMBRAND].childNodes[0].nodeValue,listOfProducts[itemCount].attributes[0].nodeValue));								
				}
			}
			
			// Return the array of objects to display based on the catergory, pre-sorted by price lowest to highest.
			return listItemsToDisplay;		
		}
		
		// Accepts 1 paramater, the number of page buttons to create.
		// Creates the HTML objects required to display the page buttons for pagination.
		// Appends these objects to the website for viewing.
		function CreatePageButtons(numberOfPageTabs)
		{
			var newPageButton = "";
			var sortType = "";
			
			// Create '<<' button.			
			newPageButton = document.createElement('li');
			newPageButton.innerHTML = '<a href="#" name = "0" onclick="DisplayPage(this);">&laquo;</a>';
			document.getElementById("pagebuttons").appendChild(newPageButton);
															
			// Create page buttons based on number required. Assign each button an event.click so can be tracked.
			for (var pageCount = 1; pageCount <= numberOfPageTabs; pageCount++)
			{
				newPageButton = document.createElement('li');
				if (pageCount == CurrentDisplayedPage)
					newPageButton.setAttribute("class", "active");
				newPageButton.innerHTML = '<a name="'+(pageCount)+'" href="#" onclick="DisplayPage(this);">'+(pageCount)+'</a>';
				document.getElementById("pagebuttons").appendChild(newPageButton);
                            
			}
			
			// Create '>>' button.
			newPageButton = document.createElement('li');
            newPageButton.innerHTML = '<a href="#" name = "-1" onclick="DisplayPage(this);">&raquo;</a>';
			document.getElementById("pagebuttons").appendChild(newPageButton);
		}
		
		// Creates an array of items to display, based on the critea of user input.
		// Filters by catergory, brand and will sort by price. Then dynamically creates each item
		// displaying to the webpage, using paganation.
		function ProductsToDisplay()
		{						
			var listItemsToDisplay = [];	// Array to hold Objects to be displayed to Webpage.						
			var numberOfPageTabs = 0;
			var StartPageItem = 0;
			var EndPageItem = 0;
			
			// Populate array of objects to display based on catergory filter, will return pre-sorted by price lowest to highest. 
			listItemsToDisplay = FilterBasedOnCatergory()
			
			// Remove objects from the array based on brand filters selected.			
			listItemsToDisplay = SortByBrand(listItemsToDisplay);
			
			// Determine total number of objects to display, after all filtering complete. Used for paganation.
			TotalItemsToDisplay = listItemsToDisplay.length;
			
			// Determine total number of pages required, to display all objects.
			// PageDivisor is used to determine page size's. Either 6, 12 or all items per page.
			if (PageDivisor == -1)    // Special case, when ALL items are to be displayed so no paganation.
				numberOfPageTabs = 1;
			else
			{
				numberOfPageTabs = Math.ceil(TotalItemsToDisplay / PageDivisor);
				if (CurrentDisplayedPage > numberOfPageTabs)      //Special case, to ensure '>>' button cant go past last page.
					CurrentDisplayedPage = numberOfPageTabs;
				if (CurrentDisplayedPage == 0)
					if (listItemsToDisplay.length > 0) CurrentDisplayedPage = 1;
			}
			
			// Create page buttons, for pagination only if there is something to be displayed.
			document.getElementById("pagebuttons").innerHTML = "";
			if (CurrentDisplayedPage != 0)
				CreatePageButtons(numberOfPageTabs);
																							
			// Using current page number, determine which and how many objects in the array need to be display			
			if (PageDivisor == -1)     // Special case, when ALL items are to be displayed so no paganation.
			{
				EndPageItem = listItemsToDisplay.length - 1;
			}
			else
			{			
				// Using currently selected page, and how many items to display calculate the starting and ending
				// index's of the object array for the items to display.
				StartPageItem = (CurrentDisplayedPage - 1) * PageDivisor;
				if ((TotalItemsToDisplay - (CurrentDisplayedPage * PageDivisor)) < 0)
					EndPageItem = listItemsToDisplay.length - 1;
				else	
					EndPageItem = (StartPageItem + PageDivisor) - 1;		
			}
			
			// Display the total count of objects avaiable to be displayed, and which subset of those objects are on the current page.
			if (CurrentDisplayedPage != 0)
			{
				document.getElementById("startItemCount").innerHTML = (StartPageItem + 1) + " - " +  (EndPageItem + 1);
				document.getElementById("endItemCount").innerHTML = listItemsToDisplay.length;
			}
			else
			{
				document.getElementById("startItemCount").innerHTML = "0 - 0";
				document.getElementById("endItemCount").innerHTML = listItemsToDisplay.length;
			}
			
			// Determine user selection based on price.
			sortType = document.getElementsByName("sort-by")[0].value;
			document.getElementById("productDiv").innerHTML = "";   // Clear div section to hold new items to display.
			
			// If user has selected high to low, display array in reverse order, as already pre-sorted low to high.
			if (sortType == "Price: high-low")
				// array.reverse :- https://www.w3schools.com/jsref/jsref_reverse.asp
				listItemsToDisplay.reverse();
							
				for (var itemCount = StartPageItem; itemCount <= EndPageItem; itemCount++)
				{
					var newDivElement = BuildAnItemDiv (itemCount,listItemsToDisplay);  // Dynamically create a div element for each object in the array.
					document.getElementById("productDiv").appendChild(newDivElement);	// Append the div, so it can be display on the webpage.		
				}							
		}
		
		// Accepts 2 paramaters, the index of an object to create a div element for. The array of all objects to display.
		function BuildAnItemDiv (index,listItemsToDisplay)
		{
			var newDivElement = document.createElement('div');			
			newDivElement.className = 'col-md-4 col-sm-6';
			newDivElement.innerHTML = '<div class="product">' +
								'<div class="flip-container">' +
									'<div class="flipper">' + 
										'<div class="front">' +
											'<a href="detail.html?id=' + listItemsToDisplay[index].Id + '">' +
											'<img src="img/'+ listItemsToDisplay[index].FrontImage + '" alt="' + listItemsToDisplay[index].FrontImage + '" class="img-responsive mycenter"></a>' +
										'</div><div class="back">' +
										'<a href="detail.html?id=' + listItemsToDisplay[index].Id + '">' +
										'<img src="img/'+ listItemsToDisplay[index].BackImage + '" alt="' + listItemsToDisplay[index].BackImage + '" class="img-responsive mycenter"></a>' +
									'</div>' +
								'</div>' +
							'</div>' +
							'<a href="detail.html?id=' + listItemsToDisplay[index].Id + '" class="invisible">' +
							'<img src="img/'+ listItemsToDisplay[index].FrontImage + '" alt="' + listItemsToDisplay[index].FrontImage + '" class="img-responsive mycenter"></a>' +
							'<div class="text">' +
								'<h3>' +
									'<a href="detail.html?id=' + listItemsToDisplay[index].Id + '">'+listItemsToDisplay[index].Name +'</a>' +
								'</h3>' +
								'<p class="price" id = "price1">$'+ listItemsToDisplay[index].Price+'</p>' +
								'<p class="buttons">' +
									'<a href="detail.html?id=' + listItemsToDisplay[index].Id + '" class="btn btn-default">View detail</a>' +
									'<a href="basket.html" class="btn btn-primary"><i class="fa fa-shopping-cart"></i>Add to cart</a>' +
								'</p>' +
							'</div></div>';
			
			// Return the created HTML div, ready for display.			
			return newDivElement;
		}
		
		// Accepts 2 paramaters, an array of objects to display and the price of the next object to insert.
		// Trasverses the array of objects to determine based on a price the index of insertion of a new object.
		// Objects will be inserted based on low-high price sort. Once insertion point is determined, the index of this point is returned.
		function GetInsertIndex(listItemsToDisplay, nextItemsPrice)
		{
			var index = -1;
			
			for (var count = 0; count < listItemsToDisplay.length; count ++)
			{
				// Number method :- https://www.w3schools.com/jsref/jsref_number.asp
				if (Number(nextItemsPrice) <= Number(listItemsToDisplay[count].Price)) 
				{
					index = count;
					return index;
				}			
				else
					index = -1;	 // Special case, end of array so must be inserted at the end.			
			}
			
			// Return insertion index.
			return index;
		}
		
		
		// Accepts 1 paramater, the array of objects to display.
		// Transverses the array and based upon user selection will remove objects by brands.
		function SortByBrand(listItemsToDisplay)
		{
			if (brandFilters.Universal == 'false')    // If Universal not selected, remove all Universal branded objects.
				{
					for (var counter = 0; counter < listItemsToDisplay.length; counter ++)
					{
						if (listItemsToDisplay[counter].Brand == "Universal")
							listItemsToDisplay.splice(counter,1);					
					}
				
				}
			if (brandFilters.Ikea == 'false')      // If Ikea not selected, remove all Ikea branded objects.
				{
					for (var counter = 0; counter < listItemsToDisplay.length; counter ++)
					{
						if (listItemsToDisplay[counter].Brand == "Ikea")						
							listItemsToDisplay.splice(counter,1);											
					}
				
				}
			if (brandFilters.Factory == 'false')      // If The Factory not selected, remove all The Factory branded objects.
				{
					for (var counter = 0; counter < listItemsToDisplay.length; counter ++)
					{
						if (listItemsToDisplay[counter].Brand == "The Factory")
							listItemsToDisplay.splice(counter,1);											
					}
				
				}
			if (brandFilters.Fantastic == 'false')    // If Fantastic not selected, remove all Fantastic branded objects.
				{
					for (var counter = 0; counter < listItemsToDisplay.length; counter ++)
					{
						if (listItemsToDisplay[counter].Brand == "Fantastic")						
							listItemsToDisplay.splice(counter,1);											
					}
				
				}
			if (brandFilters.Artdeco == 'false')    // If Artdeco not selected, remove all Artdeco branded objects.
				{
					for (var counter = 0; counter < listItemsToDisplay.length; counter ++)
					{
						if (listItemsToDisplay[counter].Brand == "Artdeco")						
							listItemsToDisplay.splice(counter,1);											
					}			
				}
			
			// Return array of objects thats have had non selected brands removed.
			return listItemsToDisplay;
		}
		
		// Checks the current state of the brands check boxes on the website and updates
		// Brands Object to track for filtering.
		function SetBrandFilters()
		{
			
			//Based on each checkboxes state, set brand flags accordingly.
			if(document.getElementById("checkUniversal").checked == false)
				brandFilters.Universal = 'false';
			else
				brandFilters.Universal = 'true';
			if(document.getElementById("checkIkea").checked == false)
				brandFilters.Ikea = 'false';
			else
				brandFilters.Ikea = 'true';
			if(document.getElementById("checkFactory").checked == false)
				brandFilters.Factory = 'false';
			else
				brandFilters.Factory = 'true';
			if(document.getElementById("checkFantastic").checked == false)
				brandFilters.Fantastic = 'false';
			else
				brandFilters.Fantastic = 'true';
			if(document.getElementById("checkArtdeco").checked == false)
				brandFilters.Artdeco = 'false';
			else
				brandFilters.Artdeco = 'true';
			
			//Call display function to update items displayed based on new brand selections by user.
			ProductsToDisplay();
		}
		
		// Clear all brand selections and clear button as been pressed.
		function ClearBrandFilters()
		{
			document.getElementById("checkUniversal").checked = false;
			brandFilters.Universal = 'true';
			document.getElementById("checkIkea").checked = false;
			brandFilters.Ikea = 'true';
			document.getElementById("checkFactory").checked = false;
			brandFilters.Factory = 'true';
			document.getElementById("checkFantastic").checked = false;
			brandFilters.Fantastic = 'true';
			document.getElementById("checkArtdeco").checked = false;
			brandFilters.Artdeco = 'true';
			
			//Call display function to update items displayed as brand selection has been removed.
			ProductsToDisplay();		
		}
		
		// Accepts 1 paramater, the name of a brand to count total amount of items in XML file with that brand name.
		// Used to display total brand counts next to checkboxes on webpage.
		function GetBrandNameCount(aBrand)
		{
			var listOfBrands = xmlDoc.getElementsByTagName("BRAND");
			var brandCount = 0;
			
			for(var count = 0; count < listOfBrands.length; count++)
			{
				if(listOfBrands[count].childNodes[0].nodeValue == aBrand)
					brandCount = brandCount + 1;
			}
			
			// Return total brand count.
			return brandCount;
		}
		
		// Runs at page startup, Initailses all variables and determines if data has been sent from previous page.
		function OnPageLoad()
		{						
			xmlDoc = loadXMLDoc("products.xml");    // Load the XML file into a DOM.
			var url = document.location.href;
			var urlSplit = url.split('=');       // Determine if data is being transferred from previous page.
			var countOfBrands = 0;
			var countOfAccessories = 0;
			
			if (urlSplit.length == 2) 
				FILTERBY = urlSplit[1];			// If data present use transferred data.
			else
				FILTERBY = 'FURNITURE';		// Otherwise display all items.
				
			// Update box catergory heading to refelect selections.
			switch (FILTERBY) 
			{
				case "CHAIR"   : document.getElementById("TitleBox").innerHTML = "Chairs"; break;
				case "TABLE"   : document.getElementById("TitleBox").innerHTML = "Tables"; break;
				case "BED"	   : document.getElementById("TitleBox").innerHTML = "Beds"; break;
				case "STORAGE" : document.getElementById("TitleBox").innerHTML = "Storage"; break;
				default		   : document.getElementById("TitleBox").innerHTML = "All Furniture";
			}
					
			// Update brand counts next to checkboxes.
			document.getElementById("UniversalCount").innerHTML = '(' + GetBrandNameCount("Universal") + ')';
			document.getElementById("IkeaCount").innerHTML = '(' + GetBrandNameCount("Ikea") + ')';
			document.getElementById("FactoryCount").innerHTML = '(' + GetBrandNameCount("The Factory") + ')';
			document.getElementById("FantasticCount").innerHTML = '(' + GetBrandNameCount("Fantastic") + ')';
			document.getElementById("ArtdecoCount").innerHTML = '(' + GetBrandNameCount("Artdeco") + ')';
			
			// Update Furniture and Accessories item counts on menu.
			countOfBrands = xmlDoc.getElementsByTagName("FURNITURE")[0].children.length;
			document.getElementById("FurnitureCount").innerHTML = countOfBrands;
			countOfAccessories = xmlDoc.getElementsByTagName("ACCESSORIES")[0].children.length;
			document.getElementById("AccessoriesCount").innerHTML = countOfAccessories;
			
			// Update webpage based on filters.					
			ProductsToDisplay();
		}
		
		//Accepts 1 paramater, the anchor object of a page button. This object is then used to determine the new page to display.
		function DisplayPage(aPage)
		{
			var pageNumber = aPage.getAttribute("name");			
			if (pageNumber == 0)
				{
					if (CurrentDisplayedPage > 1)
					CurrentDisplayedPage = CurrentDisplayedPage - 1;
				}
				
			else if (pageNumber == -1)
				CurrentDisplayedPage = CurrentDisplayedPage + 1;
			else 
			{
				CurrentDisplayedPage = Number(pageNumber);
			}
			
			//Update the webpage based on the new page number selected.
			ProductsToDisplay();
		}
		
		// Accepts 2 paramaters, the number of items to show per page and the anchor object clicked on. The archor object is then updated 
		// to reflect its selection by changing its style.
		function SetShowCount(displayCount, anchor)
		{
			PageDivisor = displayCount;
			CurrentDisplayedPage = 1;
			
			// Adjust styles to reflect a new button has been selected.
			document.getElementById("show6").classList.remove("btn-primary");
			document.getElementById("show12").classList.remove("btn-primary");
			document.getElementById("showALL").classList.remove("btn-primary");
			anchor.setAttribute("class", "btn btn-default btn-sm btn-primary");
			
			//Update the webpage based on the new number of items to display per page.
			ProductsToDisplay();		
		}		