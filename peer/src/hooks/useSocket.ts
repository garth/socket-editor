/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react'
import { network, Encryption } from 'socket:network'
import { CLUSTER_ID_SEED } from '@socket-editor/lib/config.js'
import { createId } from '@socket-editor/lib/createId.js'

let connectedSocket: any | null = null

export const useSocket = (): any | null => {
  const [socket, setSocket] = useState<any | null>(connectedSocket)

  useEffect(() => {
    if (connectedSocket == null) {
      const getSocket = async () => {
        // set the peer id
        const peerId = window.localStorage.getItem('peerId') ?? (await Encryption.createId())
        window.localStorage.setItem('peerId', peerId)

        // set the signing keys
        const keySeed = window.localStorage.getItem('keySeed') ?? createId()
        window.localStorage.setItem('keySeed', keySeed)
        const signingKeys = await Encryption.createKeyPair(keySeed)

        // set the cluster id
        const clusterId = await Encryption.createClusterId(CLUSTER_ID_SEED)

        // create the network socket
        const socket = await network({ peerId, clusterId, signingKeys })

        connectedSocket = socket
        setSocket(socket)
      }
      void getSocket()
    }
  }, [])

  return socket
}
