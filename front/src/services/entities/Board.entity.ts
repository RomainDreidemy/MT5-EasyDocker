import axios from '../utils/axios'
import { type AxiosResponse } from 'axios'
import { type TLinkBody, type TLinkEntity } from '../../types/Linker'
import { type IServiceVolumeLinks } from '../../interfaces/Service.interface'

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
  deleteServiceVolumeLink: async (id: string): Promise<AxiosResponse<void>> => await axios.delete(`/service_managed_volume_links/${id}`),
  updateServiceVolumeLink: async (serviceVolume: IServiceVolumeLinks): Promise<AxiosResponse<IServiceVolumeLinks>> => await axios.put(`/service_managed_volume_links/${serviceVolume.id}`, serviceVolume),
  generateComposeFile: async (id: string): Promise<AxiosResponse<string>> => await axios.get(`/stacks/${id}/docker_compose`),
}

export default BoardEntity
