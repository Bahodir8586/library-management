**Search Book API for admin and librarian**
----
    Returns json data.

## Search book

* **URL**

  /api/admin/books/search

* **Method**

  `GET`

* **Bearer Token**

   Yes

* **URL Params**
  
  `filter=[string|category]` <br/>
  `searchText=[string]` <br/>
  `sort=[alphabet|publishedYear]` <br/>
  `searchBy=[name|author|isbn]` <br/>
  `fromYear=[numeric]` <br/>
  `toYear=[numeric]` <br/>
  `page=[numeric|min:1]` <br/>

* **Data Params**

  None

* **Success Response:**

    * **Code:** 200 <br/>
      **Content:** 
  
  `{`<br/>
      `id: 4, ` </br>
      `image: "/url",` </br>
      `name: "Farg'ona tong otguncha",`</br>
      `author: "Qobilov Xurshidbek",`</br>
      `ISBN: "100406105",`</br>
      `publishedYear: "2020",`</br>
      `count: "16",`</br>
      `originalCount: "20",`</br>
      `categories: [{id: 2, name: "fantastic"}, {id: 4, name: "romantic"}]`</br>
      `}` </br>
  
  If no book found return [ ]
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

