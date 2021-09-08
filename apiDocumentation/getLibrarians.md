**GET Librarians API for admin**
----
    Returns json DATA

## Get librarians

* **URL**

  /api/admin/librarians/

* **Method**

  `GET`

* **Bearer Token**

  Yes

* **URL Params**

  `searchText=[string]` <br/>
  `sort=[alphabet|numberOfOrders|finishingRate|inDebtOrders]` <br/>


* **Data Params**

  None


* **Success Response:**

    * **Code:** 200 <br/>
      **Content:**
      `[{id:1,image:"url", username:"bahodir01", fullName:"Abdullayev Bahodir", finishedOrders:"412", allOrders:"419", inDebtOrders:"7"}]`<br/>

  If no librarian found return [ ]
----

* **Error Response:**


      **Code:** 401 Unauthorized <br />
      **Content:** `{ error : "Unauthorized" }`

      OR

      **Code:** 500 SERVER ERROR <br />
      **Content:** `{ error : "Unable to respond" }`

