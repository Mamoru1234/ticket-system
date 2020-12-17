function myAll(requests: Promise<any>[]): Promise<any[]> {
  const result: any[] = [];
  return new Promise<any[]>((res) => {
    let counter = requests.length;
    for (const request of requests) {
      request.then((data) => {
        counter--;
        result.push(data);
        if (counter === 0) {
          res(result);
        }
      }).catch(() => {
        counter--;
        if (counter === 0) {
          res(result);
        }
      });
    }
  });
}

async function log(requests: Promise<any>[]): Promise<void> {
  for (const request of requests) {
    const data = await request;
    console.log(data);
  }
}

async function handleUrl(url: string): Promise<void> {
  const data = await fetch(url);
  console.log(data);
}

const BATCH_SIZE = 10;

async function proceed(urls: string[]): Promise<void> {
  return new Promise((res) => {
    let processInd = 0;
    const lastHandles: Promise<void>[] = [];
    function schedule() {
      if (processInd === urls.length) {
        Promise.all(lastHandles).then(() => res());
        return;
      }
      const handle = handleUrl(urls[processInd]).then(schedule);
      if (urls.length - processInd < BATCH_SIZE) {
        lastHandles.push(handle)
      }
      processInd++;
    }
    for (let i = 0; i < BATCH_SIZE; i++) {
      schedule();
    }
  });
}
