import React from 'react'

export const About = () => {

  return (
    <div className="container mt-3">
      <p className="card-text"><h1 style={{ 'font-size': '3.5vw', 'textAlign': 'center' }}><u> Online notes in a web browser</u></h1>
        <p className="fw-semibold"><h5> ➦ <a href="http://localhost:3000" className="text-warning stretched-link">iNotebook</a>
          is a free online notepad in your web browser. With iNotebook you can create any text notes
          (ideas, to-do list, links, or any other plain text) that you would like to write just via web interface without
          leaving a browser.</h5></p></p>
      <div className="my-3">
        <img src="inotebook.png" class="img-thumbnail" alt="iNotebook" width="1000"></img>
        <div className="container my-4">
          <h5> ➦ <u>Delete</u> </h5>
          <p className="fst-normal"> You can delete any text notes saved in your iNotebook. You just need to click on the
            <b> "Trash button"</b> to delete a specific note.</p>
        </div>

        <div className="container my-4">
          <h5> ➦ <u>Modify</u> </h5>
          <p className="fst-normal"> You can modify any text notes saved in your iNotebook. You just need to click on the
            <b> "Edit button"</b> to modify a specific note.</p>
        </div>


      </div>


    </div>
  )
}
