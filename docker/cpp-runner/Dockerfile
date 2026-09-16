FROM alpine:3.19

RUN apk add --no-cache g++ bash coreutils procps util-linux

# Create non-privileged judge runner user
RUN addgroup -g 1001 judge_group && \
    adduser -D -u 1001 -G judge_group judge_runner

WORKDIR /sandbox
RUN chown -R judge_runner:judge_group /sandbox

USER judge_runner
