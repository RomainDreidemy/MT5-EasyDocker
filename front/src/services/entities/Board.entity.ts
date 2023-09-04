import axios from '../utils/axios'
import { type AxiosResponse } from 'axios'
import { type TLinkBody, type TLinkEntity } from '../../types/Linker'

const BoardEntity = {
  serviceNetworkLink: async ({
    from,
    to
  }: TLinkBody):
  Promise<AxiosResponse<TLinkEntity>> => await axios.post('/service_network_links', {
    serviceArrowPosition: from.placement,
    serviceId: from.id,
    networkArrowPosition: to.placement,
    networkId: to.id
  }),
  deleteServiceNetworkLink: async (id: string): Promise<AxiosResponse<void>> => await axios.delete(`/service_network_links/${id}`),

  serviceVolumeLink: async ({
    from,
    to
  }: TLinkBody):
  Promise<AxiosResponse<TLinkEntity>> => await axios.post('/service_managed_volume_links', {
    serviceArrowPosition: from.placement,
    serviceId: from.id,
    managedVolumeArrowPosition: to.placement,
    managedVolumeId: to.id
  }),
  deleteServiceVolumeLink: async (id: string): Promise<AxiosResponse<void>> => await axios.delete(`/service_managed_volume_links/${id}`)
}

export default BoardEntity
