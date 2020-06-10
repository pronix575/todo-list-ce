import { Subscriber, SetDataParam } from "./stream.types"

export class Stream<T> {

    constructor(
        private streamData: T,
        private subscrbers: Array<Subscriber<T>> = []
    ) {}

    data() {
        return this.streamData
    }

    addSubscriber(newSubscrber: Subscriber<T>) {

        this.subscrbers.forEach(sub => {
            if (sub.name === newSubscrber.name) { 
                throw new Error('subscriber with that name is already exist') 
            }
        })

        this.subscrbers.push(newSubscrber)
    }

    unsubscribe(name: string) {
        this.subscrbers = 
        this.subscrbers
            .filter(subscriber => subscriber.name !== name)
    }    

    setData(param: SetDataParam<T>) {
        this.streamData = param(this.streamData)
        this.subscrbers
            .forEach(subscriber => 
                subscriber.do(this.streamData)
            )
    }
}

export const safeAddSubscriber = <T>(
    stream: Stream<T>, 
    subscriber: Subscriber<T>, 
    errorHandler?: 
        (e: any) => void
) => {
    try {
        stream.addSubscriber(subscriber)
    } catch (e) {
        errorHandler && errorHandler(e)
    }
}

export default { Stream, safeAddSubscriber }