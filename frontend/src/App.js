import './App.css';
import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Navbar, NavbarBrand, NavbarToggler, Collapse, NavItem, NavLink, Nav, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, NavbarText } from 'reactstrap'


function App() {
  const [event, setevent] = useState([]);
  const [name, setname] = useState("");
  const [data, setdata] = useState("");
  const [timestamp, settimestamp] = useState();
  const [location, setlocation] = useState("");
  const [image, setimage] = useState("");

  function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
      var cookies = document.cookie.split(';');
      for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();
        // Does this cookie string begin with the name we want?
        if (cookie.substring(0, name.length + 1) === (name + '=')) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }

  useEffect(() => {
    axios.get('/api/events').then((res) => {
      setevent(res.data)
    })
  }, []);

  const handleLike = (event) => {
    event.preventDefault();
    setevent(!event.is_liked)
  }


  const FormHandle = (event) => {
    event.preventDefault();
    var formdata = new FormData()
    formdata.append("event_name", name);
    formdata.append("data", data);
    formdata.append("location", location);
    formdata.append("image", image, image.name);
    formdata.append("timestamp", timestamp);
    console.log(...formdata)

    let url = 'http://localhost:8000/api/events/';
    let headers = {
      'Content-Type': 'multipart/form-data',
    }
    const csrftoken = getCookie('csrftoken');
    if (csrftoken) {
      headers = {
        'Content-Type': 'multipart/form-data',
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRFToken': csrftoken
      }
    }
    axios.post(url, formdata, {
      headers: headers
    })
      .then(res => {
        window.location.reload()
        if (res.status === 403) {
          const detail = res.detail
          if (detail === "Authentication credentials were not provided.") {
            if (window.location.href.indexOf("login") === -1) {
              window.location.href = "/login?showLoginRequired=true"
            }
          }
        }
      })
      .catch(err => console.log(err))

  }

  return (
    <div>
      <Navbar className='color nav' expand="md" light>
        <NavbarBrand>
          <h3 className='text-header'>EventBrite</h3>
        </NavbarBrand>
        <NavbarToggler onClick={function noRefCheck() { }} />
        <Collapse navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink>
                Components
              </NavLink>
            </NavItem>
            <UncontrolledDropdown inNavbar nav>
              <DropdownToggle caret nav>
                Options
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  Option 1
                </DropdownItem>
                <DropdownItem>
                  Option 2
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                  Reset
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          <NavbarText>
            <div className='border-box'>
              <h6 className='logo'>A</h6>
              <span>adwaitnsk.2017@gmail.com</span>
            </div>
          </NavbarText>
        </Collapse>
      </Navbar>
      <h1 className='heading'>Likes</h1>
      <div className='events'>
        {event.map((event) => (
          <div className='d-flex margin' key={event.id}>
            <img className='image' src={event.image} />
            <div className='box'>
              <h3 className='event_name'>{event.event_name}</h3>
              <p className='text-muted'>Starts at {event.timestamp}</p>
              <p className='text-muted'>{event.data}</p>
            </div>
            <a onClick={handleLike}>
              <i class="icon fa fa-upload"></i>
              {
                event.is_liked ? <i className="icon fa fa-heart" style={{ color: "red" }}></i> :
                  <i className="icon fa fa-heart-o"></i>
              }
            </a>
          </div>
        ))}
      </div>
      <h1 className='heading'>Add Events</h1>
      <form onSubmit={FormHandle} className='form'>
        <div class="form-group">
          <label for="event_name">Event Name</label>
          <input type="text" class="form-control" id="event_name" placeholder="Enter Event Name" onChange={e => setname(e.target.value)} />
        </div>
        <div class="form-group">
          <label for="data">About the Event</label>
          <input type="text" class="form-control" id="data" placeholder="About Event" onChange={(e) => setdata(e.target.value)} />
        </div>
        <div class="form-group">
          <label for="location">Location of the Event</label>
          <input type="text" class="form-control" id="location" placeholder="Location of the Event" onChange={(e) => setlocation(e.target.value)} />
        </div>
        <div class="form-group">
          <label for="datetime-local">Schedule Event</label>
          <input type="date" class="form-control" id="calendar" onChange={(e) => settimestamp(e.target.value)} />
        </div>
        <div class="form-group">
          <label for="file">Image of the event</label>
          <input type="file" class="form-control" id="file" onChange={(e) => setimage(e.target.files[0])} />
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}

export default App;
