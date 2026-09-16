#!/bin/bash
# runner.sh - Inside container execution wrapper
ulimit -f 40960          # 40MB max file size output
ulimit -v 262144         # 256MB virtual memory
ulimit -c 0              # Disable core dumps

TIME_LIMIT=$1
shift

/usr/bin/time -f "METRIC_TIME=%e\nMETRIC_MEM=%M" timeout -s SIGKILL "${TIME_LIMIT}s" /sandbox/Solution.out < /sandbox/input.txt > /sandbox/stdout.txt 2> /sandbox/stderr.txt
exit $?
