# CS 260 Notes:

## Week 1: Github, IP and AWS
### I. Git commands:
```
➜  printf "\nChange from my development environment!\n" >> test.md

➜  git add test.md

➜  git commit -am "update(notes) thoughts about startup applications"

➜  git push
```

### II. The internet
- Bunch of connected devices
- Traceroute is the path from one pc to another. (Dynamically calculated each time)

#### Terms: 
- Application (HTTPS): Functionality like web browsing
- Transport (TCP): Moving connection information packets
- Internet (IP): Establishing connections
- Link (Fiber, hardware): Physical connections

### III. Domains and Route 53
- Link your domain to your IP by using our public IP address and your purchased domain
- Use * to route all sub domains to your root

### IV. HTTPS and Securing Site
- Free to secure your site, edit CaddyFile at port 80 to root domain
- Also edit other spots to your root domain. 
- Secure connection means that all data is encrypted using **TLS protocol**
- To edit Caddy file:
```
sudo vi Caddyfile
sudo service caddy restart

#Also, to ssh into your server do:
ssh -i [key pair file] ubuntu@[yourdomainnamehere]
```

# Working on Project

### I. HTML
```
Command to deploy contents to webserver

./deployFiles.sh -k ~/Desktop/cs260/awsWebserver/production.pem -h bishoff.click -s simon
```


['Read Me' for this project](docs/README.md)