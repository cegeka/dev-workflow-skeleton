# -*- mode: ruby -*-
# vi: set ft=ruby :

unless Vagrant.has_plugin?("vagrant-docker-compose")
  system("vagrant plugin install vagrant-docker-compose")
  puts "Dependencies installed, please try the command again."
  exit
end

# All Vagrant configuration is done below. The "2" in Vagrant.configure
# configures the configuration version (we support older styles for
# backwards compatibility). Please don't change it unless you know what
# you're doing.
Vagrant.configure(2) do |config|
  # The most common configuration options are documented and commented below.
  # For a complete reference, please see the online documentation at
  # https://docs.vagrantup.com.

  # Every Vagrant development environment requires a box. You can search for
  # boxes at https://atlas.hashicorp.com/search.
  config.vm.box = "chad-thompson/ubuntu-trusty64-gui"
  config.vm.boot_timeout = 300

  # Disable automatic box update checking. If you disable this, then
  # boxes will only be checked for updates when the user runs
  # `vagrant box outdated`. This is not recommended.
  # config.vm.box_check_update = false

  # Set hostname of the VM
  config.vm.hostname = "dws"

  # Create a forwarded port mapping which allows access to a specific port
  # within the machine from a port on the host machine. In the example below,
  # accessing "localhost:8080" will access port 80 on the guest machine.
  # config.vm.network "forwarded_port", guest: 80, host: 8080

  # Create a private network, which allows host-only access to the machine
  # using a specific IP.
  # config.vm.network "private_network", ip: "192.168.33.10"

  # Create a public network, which generally matched to bridged network.
  # Bridged networks make the machine appear as another physical device on
  # your network.
  # config.vm.network "public_network"

  # Share an additional folder to the guest VM. The first argument is
  # the path on the host to the actual folder. The second argument is
  # the path on the guest to mount the folder. And the optional third
  # argument is a set of non-required options.
  # config.vm.synced_folder "../data", "/vagrant_data"

  # Provider-specific configuration so you can fine-tune various
  # backing providers for Vagrant. These expose provider-specific options.
  config.vm.provider "virtualbox" do |vb|
    # Use linked clones if possible to reduce overhead
    # vb.linked_clone = true if Vagrant::VERSION =~ /^1.8/

    # Customize the name of the VM:
    # vb.name = "dws"

    # Display the VirtualBox GUI when booting the machine
    vb.gui = true
    vb.customize ["modifyvm", :id, "--vram", 128]
    vb.customize ["modifyvm", :id, "--accelerate3d", "on"]

    # Customize the amount of memory on the VM:
    vb.memory = 4096

    # Customize the number of cores on the VM:
    vb.cpus = 2

    # Optimize virtualization for linux on VT-x
    vb.customize ["modifyvm", :id, "--hwvirtex", "on"]
    vb.customize ["modifyvm", :id, "--nestedpaging", "on"]
    vb.customize ["modifyvm", :id, "--largepages", "on"]
    vb.customize ["modifyvm", :id, "--vtxvpid", "on"]
    vb.customize ["modifyvm", :id, "--paravirtprovider", "kvm"]
    vb.customize ["modifyvm", :id, "--clipboard", "bidirectional"]
    vb.customize ["modifyvm", :id, "--draganddrop", "bidirectional"]
  end

  # Define a Vagrant Push strategy for pushing to Atlas. Other push strategies
  # such as FTP and Heroku are also available. See the documentation at
  # https://docs.vagrantup.com/v2/push/atlas.html for more information.
  # config.push.define "atlas" do |push|
  #   push.app = "YOUR_ATLAS_USERNAME/YOUR_APPLICATION_NAME"
  # end

  # Enable provisioning with a shell script. Additional provisioners such as
  # Puppet, Chef, Ansible, Salt, and Docker are also available. Please see the
  # documentation for more information about their specific syntax and use.
  config.vm.provision "shell", inline: <<-SHELL
    sudo timedatectl set-timezone Europe/Brussels

    # Configure apt
    echo "Configuring apt..."
    sudo add-apt-repository -y -r ppa:webupd8team/java
    sudo add-apt-repository -y ppa:webupd8team/java
    sudo add-apt-repository -y -r ppa:webupd8team/sublime-text-3
    sudo add-apt-repository -y ppa:webupd8team/sublime-text-3
    sudo apt-get update

    # Install java (automatically accept Oracle license)
    echo "Installing Java..."
    /bin/echo /usr/bin/debconf shared/accepted-oracle-license-v1-1 select true | sudo /usr/bin/debconf-set-selections;/bin/echo /usr/bin/debconf shared/accepted-oracle-license-v1-1 seen true | sudo /usr/bin/debconf-set-selections;
    sudo apt-get -y -qq install oracle-java8-installer > /dev/null

    # Install git
    echo "Installing git..."
    sudo apt-get -y -q install git
    git config --global push.default "simple"
    git config --global pull.rebase true
    git config --global url."https://".insteadOf git://
    git config --global credential.helper 'cache --timeout=18000'

    # Install Sublime Text
    echo "Installing Sublime Text..."
    sudo apt-get -y -qq install sublime-text-installer

    # Install node.js
    echo "Installing node.js, bower and gulp..."
    sudo apt-get -y -q install curl
    curl -s -L https://deb.nodesource.com/setup_5.x | sudo bash -
    sudo apt-get -y -q install nodejs
    mkdir $HOME/.npm_global
    npm config set prefix=$HOME/.npm_global
    npm install -g npm
    cp -n .bashrc .bashrc.ori
    cp -f .bashrc.ori .bashrc
    echo 'export PATH="$HOME/.npm_global/bin:$PATH"' >> .bashrc
    npm install -g bower
    npm install -g gulp

    # Install maven
    echo "Installing Maven..."
    curl -s http://apache.belnet.be/maven/maven-3/3.3.9/binaries/apache-maven-3.3.9-bin.tar.gz > maven.tgz
    tar xzf maven.tgz
    sudo mv apache-maven-3.3.9 /opt
    sudo ln -sf /opt/apache-maven-3.3.9/bin/mvn /usr/local/bin/mvn
    rm maven.tgz

    # Install Eclipse
    echo "Installing Eclipse..."
    curl -s http://developer.eclipsesource.com/technology/epp/mars/eclipse-jee-mars-1-linux-gtk-x86_64.tar.gz > eclipse.tgz
    tar xzf eclipse.tgz
    sudo mv eclipse /opt
    sudo ln -sf /opt/eclipse/eclipse /usr/local/bin/eclipse
    rm eclipse.tgz
    sudo cat > /usr/share/applications/eclipse.desktop <<DELIM
[Desktop Entry]
Name=Eclipse
Type=Application
Exec=/opt/eclipse/eclipse
Terminal=false
Icon=/opt/eclipse/icon.xpm
Comment=Integrated Development Environment
NoDisplay=false
Categories=Development;IDE;
Name[en]=Eclipse
X-Desktop-File-Install-Version=0.22
DELIM

    # Prepare for dws docker containers
    echo "Preparing docker..."
    sudo cp -n /etc/hosts /etc/hosts.ori
    sudo cp -f /etc/hosts.ori /etc/hosts
    sudo echo "127.0.0.1 dws_db_1" >> /etc/hosts
    sudo usermod -aG docker vagrant

    # Disable screen locking
    DISPLAY=:0 gsettings set org.gnome.desktop.screensaver lock-enabled false

  SHELL

  config.vm.provision :docker
  config.vm.provision :docker_compose

  # Start containers
  # config.vm.provision :docker_compose, yml: "/vagrant/ops/dws/docker-compose.yml", rebuild: true, project_name: "opsdws", run: "always"

end
