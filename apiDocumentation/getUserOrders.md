**Get Orders API for user**
----
    Returns json data.

## Get orders

* **URL**

  /api/user/orders/

* **Method**

  `GET`

* **Bearer Token**

  Yes

* **URL Params**

  `filter=[string|status]` <br/>
  `searchText=[string]` <br/>
  `searchBy=[book|librarian]` <br/>
  `page=[numeric|min:1]` <br/>

* **Data Params**

  None

* **Success Response:**

    * **Code:** 200 <br/>
      **Content:**

  `{`<br/>
  `id: 4, ` </br>
  `book: {id:bookID, name:bookName},` </br>
  `librarian: {id:librarianID, name:librarianName},`</br>
  `status: "[denied|inDebt|finished|onProcess|waiting]",`</br>
`givenDate: [status:{denied,waiting:null || inDebt,finished,onProcess:bookGivenDate ||}]`</br>
`mustReturnDate: [status:{denied,waiting:null || inDebt,finished,onProcess:mustReturnDate ||}]`</br>
`wantedDate: [wantedDate}]`</br>
`returnedDate: [status:{denied,waiting,inDebt,onProcess:null || finished:returnedDate}]`</br>

  If no orders found return [ ]
----



* **Error Response:**


      **Code:** 404 NOT FOUND <br />
      **Content:** `{ error : "Phone not found!" }`

      OR

      **Code:** 422 VALIDATION <br />
      **Content:** `{ error : "Data is not valid." }`

      OR

      **Code:** 500 SERVER ERROR <br />
      **Content:** `{ error : "Unable to process the data }`

