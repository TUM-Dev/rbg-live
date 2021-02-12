# RGB-live
This project was created to redesign the Livestream and VoD website of the [RBG-Multimedia](https://www.in.tum.de/rbg) group.
This project will be available at [live.rbg.tum.de](https://live.rbg.tum.de).  
Major Features include a modern UI with dark-mode Support and a Live-Chat.

## Contribution
If you want to contribute, please create a pull request and just wait for it to be reviewed ;)

## Getting started with development
The following guide is optiomised for Linux.
On native-Windows installing some things is more tedious and requires the respective installers.
We recommend you use [WSL2](https://docs.microsoft.com/de-de/windows/wsl/install-win10) for this reason.

Clone the Project using
```bash
git clone https://github.com/TUM-Dev/rbg-live.git
cd rbg-live
```

Install system dependencies (on a Debian-like system)

```bash
sudo apt-get update
sudo apt-get install -y python3-pip python3-venv npm
```

Install Python dependencies in an virtual environment

```bash
python3 -m venv venv
source venv/bin/activate
python3 -m pip install --upgrade pip
python3 -m pip install -r requirements.txt
```

### Frontend

All nessesary files can be build and installed using
```bash
./build.sh
```

### Backend

Create a file in `backend-django/rbg_live/` named `.env`
in this File add
```dotenv
DEBUG=True
SECRET_KEY="SECRET"
```

This file represents your environment-options present when launching the backend server.

Create the SQLite-database by running the following command

```bash
python3 backend-django/manage.py migrate
```

Start the local webserver

```bash
python3 backend-django/manage.py runserver
```

You can now visit http://localhost:8000/ in your browser to access the project.
