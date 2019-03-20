FROM python:3.7.2-slim

EXPOSE 8000

ENV HOME /root
ENV APP_HOME /application/
ENV NODE_ENV production
ENV C_FORCE_ROOT=true

RUN apt-get update
RUN apt-get install -y --no-install-recommends gnupg2 curl
RUN curl -sL https://deb.nodesource.com/setup_10.x | bash -
RUN apt-get update
RUN mkdir -p /usr/share/man/man1
RUN apt-get install -y --no-install-recommends build-essential \
        openjdk-8-jdk \
        apt-transport-https \
        ca-certificates \
        gnupg \
        curl \
        git \
        libpq-dev \
        libxml2-dev \
        libxslt1-dev \
        openssh-client \
        file \
        libtiff5-dev \
        libjpeg-dev \
        zlib1g-dev \
        libfreetype6-dev \
        liblcms2-dev \
        tcl8.6-dev \
        tk8.6-dev \
        python-tk \
        xmlsec1 \
        ffmpeg \
        nodejs \
        python3-pil


# Clean up APT and bundler when done.
RUN rm -rf /usr/share/doc \
           /usr/share/man \
           /usr/share/groff \
           /usr/share/info \
           /usr/share/lintian \
           /usr/share/linda \
           /usr/share/locale/ \
           /var/cache/man

# Clean up APT when done.
RUN apt-get clean
RUN apt-get autoclean
RUN apt-get autoremove
RUN rm -rf /var/lib/apt/lists/* \
           /tmp/* \
           /var/tmp/*


RUN mkdir -p $APP_HOME
#COPY /docker-entrypoint.sh $APP_HOME
WORKDIR $APP_HOME

ADD ./application/backend/requirements.txt $APP_HOME/requirements.txt
RUN pip install -r $APP_HOME/requirements.txt
RUN rm -rf requirements.txt
ADD . $APP_HOME